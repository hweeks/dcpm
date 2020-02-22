docker login -u $DOCKER_USER -p $DOCKER_PASS
docker build -t dcpm-be-ci --build-arg GIT_COMMIT=$(git rev-parse HEAD) .
docker tag dcpm-be-ci hams/dcpm-be:$(git rev-parse HEAD)
docker tag dcpm-be-ci hams/dcpm-be:latest
docker push hams/dcpm-be:$(git rev-parse HEAD)
docker push hams/dcpm-be:latest