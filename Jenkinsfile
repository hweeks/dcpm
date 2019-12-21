pipeline {
  agent {
    label 'dcpm'
  }
  environment {
    NPM_TOKEN = credentials('npm-token')
    GH_TOKEN = credentials('github-token')
  }
  stages {
    stage('install') {
      steps {
        sh """
          yarn
        """
      }
    }
    stage('lint') {
      steps {
        sh """
          yarn lint
        """
      }
    }
    stage('docs') {
      steps {
        sh """
          cd packages/docs
          ./qd.sh
        """
      }
    }
    stage('release') {
      steps {
        sh """
          printenv
          yarn release
        """
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
    }
  }
}
