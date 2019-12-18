docker login -u $DOCKER_USER -p $DOCKER_PASS
docker build -t dcpm-be-ci --build-arg GIT_COMMIT=$(git describe --abbrev=0 --tags) .
docker tag dcpm-be-ci hams/dcpm-be:$(git describe --abbrev=0 --tags)
docker tag dcpm-be-ci hams/dcpm-be:latest
docker push hams/dcpm-be:$(git describe --abbrev=0 --tags)
docker push hams/dcpm-be:latest