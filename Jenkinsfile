pipeline {
  agent {
    label 'dcpm'
  }
  environment {
    NPM_TOKEN = credentials('npm-token')
    GH_TOKEN = credentials('github-token')
    DOCKER_USER = 'hams'
    DOCKER_PASS = credentials('docker-pass')
  }
  stages {
    stage('prepare') {
      parallel {
        stage('skip ci') {
          steps {
            script {
              if (sh(script: "git log -1 --pretty=%B | fgrep -ie '[skip ci]' -e '[ci skip]'", returnStatus: true) == 0) {
                currentBuild.result = 'NOT_BUILT'
                error 'Aborting because commit message contains [skip ci]'
              }
            }
          }
        }
        stage('install') {
          steps {
            sh """
              sh ~/.bashrc
              export YARN_CACHE_FOLDER=$WORKSPACE/.cache
              yarn --frozen-lockfile
            """
          }
        }
      }
    }
    stage('code quality') {
      parallel {
        stage('lint') {
          steps {
            sh """
              yarn lint
            """
          }
        }
        stage('test') {
          steps {
            sh """
              yarn test
            """
          }
        }
        stage('publish test') {
          steps {
            sh """
              yarn test:publish
            """
          }
        }
      }
    }
    stage('releases') {
      parallel {
        stage('cli') {
          steps {
            sh """
              cd cli
              yarn semantic-release
            """
          }
        }
        stage('backend') {
          steps {
            sh """
              cd backend/
              ./docker-build-n-tag.sh
            """
          }
        }
        stage('frontend') {
          steps {
            sh """
              cd frontend/
              ./docker-build-n-tag.sh
            """
          }
        }
        stage('docs') {
          steps {
            sh """
              cd docs/
              ./docker-build-n-tag.sh
            """
          }
        }
      }
    }
  }
  post {
    success {
      echo 'I succeeeded!'
    }
    failure {
      echo 'I failed :('
    }
    cleanup {
      deleteDir()
      script {
        try {
          sh "docker system prune -a -f --volumes"
        } catch (error) {
          echo "no need to panic, this is fine :thumbsup_all:"
        }
      }
    }
  }
}
