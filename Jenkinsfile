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
                        export AWS_DEFAULT_REGION=us-east-2
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
                        sh '''
                            export AWS_DEFAULT_REGION=us-east-2
                            terraform init -input=false
                        '''
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
                        sh '''
                            export AWS_DEFAULT_REGION=us-east-2
                            terraform validate
                        '''
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
                        sh '''
                            export AWS_DEFAULT_REGION=us-east-2
                            rm -f tfplan
                            terraform plan -input=false -out=tfplan
                        '''
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
                        script {
                            sh '''
                                export AWS_DEFAULT_REGION=us-east-2
                                terraform apply -input=false -auto-approve tfplan

                                terraform output -raw blue_instance_public_ip  > blue_host.txt
                                terraform output -raw green_instance_public_ip > green_host.txt
                                terraform output -raw blue_tg_arn              > blue_tg_arn.txt
                                terraform output -raw green_tg_arn             > green_tg_arn.txt
                                terraform output -raw listener_arn             > listener_arn.txt
                            '''

                            env.BLUE_HOST    = readFile('blue_host.txt').trim()
                            env.GREEN_HOST   = readFile('green_host.txt').trim()
                            env.BLUE_TG_ARN  = readFile('blue_tg_arn.txt').trim()
                            env.GREEN_TG_ARN = readFile('green_tg_arn.txt').trim()
                            env.LISTENER_ARN = readFile('listener_arn.txt').trim()

                            echo "BLUE_HOST: ${env.BLUE_HOST}"
                            echo "GREEN_HOST: ${env.GREEN_HOST}"
                            echo "BLUE_TG_ARN: ${env.BLUE_TG_ARN}"
                            echo "GREEN_TG_ARN: ${env.GREEN_TG_ARN}"
                            echo "LISTENER_ARN: ${env.LISTENER_ARN}"
                        }
                    }
                }
            }
        }

        stage('Validate Terraform Outputs') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                script {
                    echo "Checking Terraform outputs..."
                    echo "BLUE_HOST => ${env.BLUE_HOST}"
                    echo "GREEN_HOST => ${env.GREEN_HOST}"
                    echo "BLUE_TG_ARN => ${env.BLUE_TG_ARN}"
                    echo "GREEN_TG_ARN => ${env.GREEN_TG_ARN}"
                    echo "LISTENER_ARN => ${env.LISTENER_ARN}"

                    if (!env.BLUE_HOST?.trim())    error("BLUE_HOST is empty")
                    if (!env.GREEN_HOST?.trim())   error("GREEN_HOST is empty")
                    if (!env.BLUE_TG_ARN?.trim())  error("BLUE_TG_ARN is empty")
                    if (!env.GREEN_TG_ARN?.trim()) error("GREEN_TG_ARN is empty")
                    if (!env.LISTENER_ARN?.trim()) error("LISTENER_ARN is empty")
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
                        def activeTg = sh(
                            script: """
                                export AWS_DEFAULT_REGION=us-east-2
                                aws elbv2 describe-listeners \
                                  --listener-arns ${env.LISTENER_ARN} \
                                  --query 'Listeners[0].DefaultActions[0].TargetGroupArn' \
                                  --output text
                            """,
                            returnStdout: true
                        ).trim()

                        echo "Currently active target group: ${activeTg}"

                        if (activeTg == env.BLUE_TG_ARN) {
                            env.ACTIVE_ENV   = 'blue'
                            env.INACTIVE_ENV = 'green'
                            env.TARGET_HOST  = env.GREEN_HOST
                            env.OLD_TG_ARN   = env.BLUE_TG_ARN
                            env.NEW_TG_ARN   = env.GREEN_TG_ARN
                        } else {
                            env.ACTIVE_ENV   = 'green'
                            env.INACTIVE_ENV = 'blue'
                            env.TARGET_HOST  = env.BLUE_HOST
                            env.OLD_TG_ARN   = env.GREEN_TG_ARN
                            env.NEW_TG_ARN   = env.BLUE_TG_ARN
                        }

                        echo "ACTIVE_ENV: ${env.ACTIVE_ENV}"
                        echo "INACTIVE_ENV: ${env.INACTIVE_ENV}"
                        echo "TARGET_HOST: ${env.TARGET_HOST}"
                        echo "OLD_TG_ARN: ${env.OLD_TG_ARN}"
                        echo "NEW_TG_ARN: ${env.NEW_TG_ARN}"
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
                        export AWS_DEFAULT_REGION=us-east-2
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
                        sh '''
                            export AWS_DEFAULT_REGION=us-east-2
                            terraform destroy -input=false -auto-approve
                        '''
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
                            export AWS_DEFAULT_REGION=us-east-2
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
