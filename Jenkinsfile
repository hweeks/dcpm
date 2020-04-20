pipeline {
  agent {
    label 'dcpm'
  }
  environment {
    NPM_TOKEN = credentials('npm-token')
    GH_TOKEN = credentials('github-token')
    DOCKER_USER = 'hams'
    DOCKER_PASS = credentials('docker-pass')
    DEPLOY_TOKEN = credentials('dcpm-do-token')
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
              yarn lint:commit
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
      when {
        branch 'master'
      }
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
          when {
            changeset "backend/**/*"
          }
          steps {
            sh """
              cd backend/
              ./docker-build-n-tag.sh
              curl https://ci.dcpm.dev/job/dcpm-deployments/job/do-be/buildWithParameters?token=$DEPLOY_TOKEN&LATEST_DOCS_VERSION=$GIT_COMMIT
            """
          }
        }
        stage('frontend') {
          when {
            changeset "frontend/**/*"
          }
          steps {
            sh """
              cd frontend/
              ./docker-build-n-tag.sh
              curl https://ci.dcpm.dev/job/dcpm-deployments/job/do-fe/buildWithParameters?token=$DEPLOY_TOKEN&LATEST_DOCS_VERSION=$GIT_COMMIT
            """
          }
        }
        stage('docs') {
          when {
            changeset "docs/**/*"
          }
          steps {
            sh """
              cd docs/
              ./docker-build-n-tag.sh
              curl https://ci.dcpm.dev/job/dcpm-deployments/job/do-docs/buildWithParameters?token=$DEPLOY_TOKEN&LATEST_DOCS_VERSION=$GIT_COMMIT
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
