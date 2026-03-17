pipeline {
    agent any

    tools {
        terraform 'terraform'
        nodejs 'node20'
    }

    environment {
        GIT_REPO           = 'https://github.com/vasukumgit/stack1.git'
        GIT_BRANCH         = 'main'
        TF_DIR             = 'terraform1'
        APP_DIR            = 'graphic-design-tool-main'   // change this if needed
        AWS_DEFAULT_REGION = 'us-east-2'

        BLUE_HOST          = '3.111.11.11'
        GREEN_HOST         = '3.111.11.12'

        BLUE_TG_ARN        = 'arn:aws:elasticloadbalancing:us-east-2:123456789012:targetgroup/blue-tg/xxxxxx'
        GREEN_TG_ARN       = 'arn:aws:elasticloadbalancing:us-east-2:123456789012:targetgroup/green-tg/yyyyyy'

        LISTENER_ARN       = 'arn:aws:elasticloadbalancing:us-east-2:123456789012:listener/app/my-alb/aaa/bbb'

        ACTIVE_ENV         = ''
        INACTIVE_ENV       = ''
        TARGET_HOST        = ''
        NEW_TG_ARN         = ''
        OLD_TG_ARN         = ''
    }

    parameters {
        choice(name: 'ACTION', choices: ['apply', 'destroy'], description: 'Terraform action')
    }

    stages {
        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: "${GIT_BRANCH}", url: "${GIT_REPO}"
            }
        }

        stage('Verify Project Structure') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                sh """
                    echo "Workspace:"
                    pwd
                    echo "Files:"
                    ls -la
                    echo "App folder:"
                    ls -la ${APP_DIR}
                """
            }
        }

        stage('Terraform Init') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                dir("${TF_DIR}") {
                    sh 'terraform init'
                }
            }
        }

        stage('Terraform Validate') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                dir("${TF_DIR}") {
                    sh 'terraform validate'
                }
            }
        }

        stage('Terraform Plan') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                dir("${TF_DIR}") {
                    sh 'terraform plan -out=tfplan'
                }
            }
        }

        stage('Terraform Apply') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                dir("${TF_DIR}") {
                    sh 'terraform apply -auto-approve tfplan'
                }
            }
        }

        stage('Detect Active Environment') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                script {
                    def activeTG = sh(
                        script: """
                            aws elbv2 describe-listeners \
                              --listener-arns ${LISTENER_ARN} \
                              --query 'Listeners[0].DefaultActions[0].TargetGroupArn' \
                              --output text
                        """,
                        returnStdout: true
                    ).trim()

                    if (activeTG == 'None' || activeTG == '') {
                        activeTG = sh(
                            script: """
                                aws elbv2 describe-listeners \
                                  --listener-arns ${LISTENER_ARN} \
                                  --query 'Listeners[0].DefaultActions[0].ForwardConfig.TargetGroups[0].TargetGroupArn' \
                                  --output text
                            """,
                            returnStdout: true
                        ).trim()
                    }

                    if (activeTG == env.BLUE_TG_ARN) {
                        env.ACTIVE_ENV   = 'blue'
                        env.INACTIVE_ENV = 'green'
                        env.TARGET_HOST  = env.GREEN_HOST
                        env.NEW_TG_ARN   = env.GREEN_TG_ARN
                        env.OLD_TG_ARN   = env.BLUE_TG_ARN
                    } else {
                        env.ACTIVE_ENV   = 'green'
                        env.INACTIVE_ENV = 'blue'
                        env.TARGET_HOST  = env.BLUE_HOST
                        env.NEW_TG_ARN   = env.BLUE_TG_ARN
                        env.OLD_TG_ARN   = env.GREEN_TG_ARN
                    }

                    echo "Active environment: ${env.ACTIVE_ENV}"
                    echo "Inactive environment: ${env.INACTIVE_ENV}"
                    echo "Deploy target host: ${env.TARGET_HOST}"
                }
            }
        }

        stage('Build Application') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                dir("${APP_DIR}") {
                    sh '''
                        npm install
                    '''
                }
            }
        }

        stage('Package Application') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                sh """
                    tar -czf app.tar.gz -C ${APP_DIR} .
                    ls -lh app.tar.gz
                """
            }
        }

        stage('Deploy to Inactive Environment') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                        scp -o StrictHostKeyChecking=no app.tar.gz ubuntu@${TARGET_HOST}:/home/ubuntu/

                        ssh -o StrictHostKeyChecking=no ubuntu@${TARGET_HOST} '
                            mkdir -p /home/ubuntu/app &&
                            rm -rf /home/ubuntu/app/* &&
                            tar -xzf /home/ubuntu/app.tar.gz -C /home/ubuntu/app &&
                            cd /home/ubuntu/app &&
                            npm install &&
                            pm2 delete app || true &&
                            pm2 start server.js --name app &&
                            pm2 save
                        '
                    """
                }
            }
        }

        stage('Health Check') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${TARGET_HOST} '
                            sleep 20
                            curl -f http://localhost:3000/ >/dev/null
                        '
                    """
                }
            }
        }

        stage('Switch Traffic') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                sh """
                    aws elbv2 modify-listener \
                      --listener-arn ${LISTENER_ARN} \
                      --default-actions Type=forward,TargetGroupArn=${NEW_TG_ARN}
                """
            }
        }

        stage('Post Switch Validation') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                sh 'sleep 15'
            }
        }

        stage('Terraform Destroy') {
            when {
                expression { params.ACTION == 'destroy' }
            }
            steps {
                dir("${TF_DIR}") {
                    sh 'terraform init'
                    sh 'terraform destroy -auto-approve'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully'
        }

        failure {
            script {
                if (params.ACTION == 'apply' && env.OLD_TG_ARN?.trim()) {
                    sh """
                        aws elbv2 modify-listener \
                          --listener-arn ${LISTENER_ARN} \
                          --default-actions Type=forward,TargetGroupArn=${OLD_TG_ARN} || true
                    """
                    echo 'Pipeline failed. Rollback attempted.'
                } else {
                    echo 'Pipeline failed before traffic switch information was available.'
                }
            }
        }
    }
}
