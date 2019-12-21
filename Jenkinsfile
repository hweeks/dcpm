pipeline {
  agent {
    label 'dcpm'
  }
  environment {
    NPM_TOKEN = credentials('npm-token')
    GH_TOKEN = credentials('github-token')
  }
  stages {
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
