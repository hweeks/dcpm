pipeline {
  agent {
    label 'dcpm'
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
