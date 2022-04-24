FROM node:12-alpine

EXPOSE 4000

ARG NODE_ENV=production
ARG GIT_COMMIT=unspecified
ARG USER=app
ARG GROUP=app
ARG UID=1337
ARG GID=1337

LABEL git_commit=$GIT_COMMIT

USER root

COPY . /app/fe/

RUN cd /app/fe && yarn install --production=false && \
    yarn build && rm -rf node_modules && \
    yarn install &&\
    addgroup -g $GID -S $GROUP &&\
    adduser -u $UID -S $USER -G $GROUP &&\
    cd /app/fe &&\
    chown -R $USER:$GROUP /app/fe &&\
    chmod -R 0744 /app/fe

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app/fe

USER app

CMD node server/index.js
