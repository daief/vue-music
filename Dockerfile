FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /app
COPY package.json yarn.lock /app/
COPY NeteaseCloudMusicApi /app/NeteaseCloudMusicApi/

RUN yarn --only=prod --registry=https://registry.npm.taobao.org
RUN yarn workspaces info

EXPOSE 3000
CMD ["yarn", "start"]
