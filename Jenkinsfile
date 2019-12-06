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
          mkdocs build
          scp -r site/* centos@157.245.185.94:/home/centos/docs/static
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
