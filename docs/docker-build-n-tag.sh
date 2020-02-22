docker login -u $DOCKER_USER -p $DOCKER_PASS
docker build -t dcpm-docs-ci --build-arg GIT_COMMIT=$(git rev-parse HEAD) .
docker tag dcpm-docs-ci hams/dcpm-docs:$(git rev-parse HEAD)
docker tag dcpm-docs-ci hams/dcpm-docs:latest
docker push hams/dcpm-docs:$(git rev-parse HEAD)
docker push hams/dcpm-docs:latest
