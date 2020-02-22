FROM node:12

EXPOSE 4000

ARG NODE_ENV=production
ARG GIT_COMMIT=unspecified

LABEL git_commit=$GIT_COMMIT

USER root

COPY . /app/fe/

RUN cd /app/fe && yarn install --production=false && \
    yarn build && rm -rf node_modules && \
    yarn install

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app/fe

USER root

CMD node server/index.js
