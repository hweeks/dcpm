FROM node:12

EXPOSE 3000

ARG NODE_ENV=production
ARG GIT_COMMIT=unspecified

LABEL git_commit=$GIT_COMMIT

USER root

COPY . /app/be/

RUN cd /app/be && yarn install --production=false && \
    yarn build && rm -rf node_modules && \
    yarn install && mkdir /app/be/logs

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app/be

USER root

CMD node dist/server/index.js
