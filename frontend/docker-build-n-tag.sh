docker login -u $DOCKER_USER -p $DOCKER_PASS
docker build -t dcpm-fe-ci --build-arg GIT_COMMIT=$(git rev-parse HEAD) .
docker tag dcpm-fe-ci hams/dcpm-fe:$(git rev-parse HEAD)
docker tag dcpm-fe-ci hams/dcpm-fe:latest
docker push hams/dcpm-fe:$(git rev-parse HEAD)
docker push hams/dcpm-fe:latest
