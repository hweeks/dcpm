FROM node:12

EXPOSE 3000

ARG NODE_ENV=production
ARG GIT_COMMIT=unspecified
ARG USER=app
ARG GROUP=app
ARG UID=1337
ARG GID=1337

LABEL git_commit=$GIT_COMMIT

USER root

COPY . /app/be/

RUN cd /app/be && yarn install --production=false && \
    yarn build && rm -rf node_modules && \
    yarn install && mkdir /app/be/logs &&\
    groupadd --gid $GID $GROUP &&\
    useradd --uid $UID --gid $GID $USER &&\
    cd /app/be &&\
    chown -R $USER:$GROUP /app/be &&\
    chmod -R 0744 /app/be

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app/be

USER app

CMD node dist/server/index.js
