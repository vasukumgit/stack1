pipeline {
    agent any

    tools {
        nodejs 'node20'
    }

    environment {
        GIT_REPO           = 'https://github.com/vasukumgit/stack1.git'
        GIT_BRANCH         = 'main'
        TF_DIR             = 'terraform1'
        APP_DIR            = 'graphic-design-tool-main/graphic-design-tool-blue'
        AWS_DEFAULT_REGION = 'us-east-2'

        BLUE_HOST          = ''
        GREEN_HOST         = ''
        BLUE_TG_ARN        = ''
        GREEN_TG_ARN       = ''
        LISTENER_ARN       = ''

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

        stage('Verify Tools and Structure') {
            steps {
                sh """
                    echo "Workspace:"
                    pwd

                    echo "Files:"
                    ls -la

                    echo "Terraform folder:"
                    ls -la ${TF_DIR}

                    echo "App folder:"
                    ls -la ${APP_DIR}

                    echo "Backend folder:"
                    ls -la ${APP_DIR}/Backend || true

                    echo "Node version:"
                    node -v || true

                    echo "NPM version:"
                    npm -v || true

                    echo "Terraform version:"
                    terraform -version || true

                    echo "AWS CLI version:"
                    aws --version || true
                """
            }
        }

        stage('Check AWS Access') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'aws-creds',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )]) {
                    sh '''
                        aws sts get-caller-identity
                    '''
                }
            }
        }

        stage('Terraform Init') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'aws-creds',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )]) {
                    dir("${TF_DIR}") {
                        sh 'terraform init -input=false'
                    }
                }
            }
        }

        stage('Terraform Validate') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'aws-creds',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )]) {
                    dir("${TF_DIR}") {
                        sh 'terraform validate'
                    }
                }
            }
        }

        stage('Terraform Plan') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'aws-creds',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )]) {
                    dir("${TF_DIR}") {
                        sh 'terraform plan -input=false -out=tfplan'
                    }
                }
            }
        }

        stage('Terraform Apply') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'aws-creds',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )]) {
                    dir("${TF_DIR}") {
                        sh 'terraform apply -input=false -auto-approve tfplan'
                    }
                }
            }
        }

        stage('Load Terraform Outputs') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'aws-creds',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )]) {
                    script {
                        env.BLUE_HOST = sh(
                            script: "cd ${TF_DIR} && terraform output -raw blue_instance_public_ip",
                            returnStdout: true
                        ).trim()

                        env.GREEN_HOST = sh(
                            script: "cd ${TF_DIR} && terraform output -raw green_instance_public_ip",
                            returnStdout: true
                        ).trim()

                        env.BLUE_TG_ARN = sh(
                            script: "cd ${TF_DIR} && terraform output -raw blue_tg_arn",
                            returnStdout: true
                        ).trim()

                        env.GREEN_TG_ARN = sh(
                            script: "cd ${TF_DIR} && terraform output -raw green_tg_arn",
                            returnStdout: true
                        ).trim()

                        env.LISTENER_ARN = sh(
                            script: "cd ${TF_DIR} && terraform output -raw listener_arn",
                            returnStdout: true
                        ).trim()

                        echo "BLUE_HOST: ${env.BLUE_HOST}"
                        echo "GREEN_HOST: ${env.GREEN_HOST}"
                        echo "BLUE_TG_ARN: ${env.BLUE_TG_ARN}"
                        echo "GREEN_TG_ARN: ${env.GREEN_TG_ARN}"
                        echo "LISTENER_ARN: ${env.LISTENER_ARN}"
                    }
                }
            }
        }

        stage('Detect Active Environment') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'aws-creds',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )]) {
                    script {
                        def activeTG = sh(
                            script: """
                                aws elbv2 describe-listeners \
                                  --listener-arns ${env.LISTENER_ARN} \
                                  --query 'Listeners[0].DefaultActions[0].TargetGroupArn' \
                                  --output text
                            """,
                            returnStdout: true
                        ).trim()

                        if (activeTG == 'None' || activeTG == '') {
                            activeTG = sh(
                                script: """
                                    aws elbv2 describe-listeners \
                                      --listener-arns ${env.LISTENER_ARN} \
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
                        echo "Deploying to host: ${env.TARGET_HOST}"
                    }
                }
            }
        }

        stage('Build Application') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                dir("${APP_DIR}/Backend") {
                    sh '''
                        npm install
                        npm run build
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
                        scp -o StrictHostKeyChecking=no app.tar.gz ubuntu@${env.TARGET_HOST}:/home/ubuntu/app.tar.gz

                        ssh -o StrictHostKeyChecking=no ubuntu@${env.TARGET_HOST} '
                            set -e
                            mkdir -p /home/ubuntu/app
                            rm -rf /home/ubuntu/app/*
                            tar -xzf /home/ubuntu/app.tar.gz -C /home/ubuntu/app
                            cd /home/ubuntu/app/Backend
                            npm install
                            pm2 delete app || true
                            pm2 start server.js --name app
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
                        ssh -o StrictHostKeyChecking=no ubuntu@${env.TARGET_HOST} '
                            sleep 20
                            curl -f http://localhost:5050/ >/dev/null
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
                withCredentials([usernamePassword(
                    credentialsId: 'aws-creds',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )]) {
                    sh """
                        aws elbv2 modify-listener \
                          --listener-arn ${env.LISTENER_ARN} \
                          --default-actions Type=forward,TargetGroupArn=${env.NEW_TG_ARN}
                    """
                }
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
                withCredentials([usernamePassword(
                    credentialsId: 'aws-creds',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )]) {
                    dir("${TF_DIR}") {
                        sh 'terraform init -input=false'
                        sh 'terraform destroy -input=false -auto-approve'
                    }
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
                if (params.ACTION == 'apply' && env.OLD_TG_ARN?.trim() && env.LISTENER_ARN?.trim()) {
                    withCredentials([usernamePassword(
                        credentialsId: 'aws-creds',
                        usernameVariable: 'AWS_ACCESS_KEY_ID',
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                    )]) {
                        sh """
                            aws elbv2 modify-listener \
                              --listener-arn ${env.LISTENER_ARN} \
                              --default-actions Type=forward,TargetGroupArn=${env.OLD_TG_ARN} || true
                        """
                    }
                    echo 'Pipeline failed. Rollback attempted.'
                } else {
                    echo 'Pipeline failed before rollback details were available.'
                }
            }
        }
    }
}
