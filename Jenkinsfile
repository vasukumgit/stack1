pipeline {
    agent any

    parameters {
        choice(name: 'ACTION', choices: ['apply', 'destroy'], description: 'Terraform action')
    }

    environment {
        GIT_REPO      = 'https://github.com/vasukumgit/stack1.git'
        GIT_BRANCH    = 'main'
        TF_DIR        = 'terraform1'
        APP_DIR       = 'graphic-design-tool-main/graphic-design-tool-main'
        AWS_DEFAULT_REGION = 'us-east-2'
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

        stage('Terraform Init') {
            steps {
                dir("${TF_DIR}") {
                    sh 'terraform init'
                }
            }
        }

        stage('Terraform Validate') {
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
                    withEnv([
                        "AWS_ACCESS_KEY_ID=${credentials('AWS_ACCESS_KEY_ID')}",
                        "AWS_SECRET_ACCESS_KEY=${credentials('AWS_SECRET_ACCESS_KEY')}"
                    ]) {
                        sh 'terraform plan -out=tfplan'
                    }
                }
            }
        }

        stage('Terraform Apply') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                dir("${TF_DIR}") {
                    withEnv([
                        "AWS_ACCESS_KEY_ID=${credentials('AWS_ACCESS_KEY_ID')}",
                        "AWS_SECRET_ACCESS_KEY=${credentials('AWS_SECRET_ACCESS_KEY')}"
                    ]) {
                        sh 'terraform apply -auto-approve tfplan'
                    }
                }
            }
        }

        stage('Get EC2 Public IP') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                script {
                    env.EC2_IP = sh(
                        script: "cd ${TF_DIR} && terraform output -raw ec2_public_ip",
                        returnStdout: true
                    ).trim()
                    echo "EC2 Public IP: ${env.EC2_IP}"
                }
            }
        }

        stage('Deploy Application to EC2') {
            when {
                expression { params.ACTION == 'apply' }
            }
            steps {
                sshagent(credentials: ['ec2-ssh-key']) {
                    sh """
                        sleep 30
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} '
                            sudo mkdir -p /var/www/html/app
                        '

                        scp -o StrictHostKeyChecking=no -r ${APP_DIR}/* ubuntu@${EC2_IP}:/tmp/

                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} '
                            sudo cp -r /tmp/* /var/www/html/app/
                            sudo systemctl restart nginx
                        '
                    """
                }
            }
        }

        stage('Terraform Destroy') {
            when {
                expression { params.ACTION == 'destroy' }
            }
            steps {
                dir("${TF_DIR}") {
                    withEnv([
                        "AWS_ACCESS_KEY_ID=${credentials(' AWS_ACCESS_KEY_ID')
                        "AWS_SECRET_ACCESS_KEY=${credentials('AWS_SECRET_ACCESS_KEY')}"
                    ]) {
                        sh 'terraform destroy -auto-approve'
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully"
        }
        failure {
            echo "Pipeline failed"
        }
    }
}
