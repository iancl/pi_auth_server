FROM node:10.15.0-alpine

ENV NODE_ENV=production

RUN mkdir -p /opt/app/
WORKDIR /opt/app/
COPY . /opt/app/
RUN apk upgrade && \
    apk update && \
    apk --no-cache add --virtual builds-deps build-base python  && \
    npm config set python /usr/bin/python && \
    npm install && \
    npm rebuild bcrypt --build-from-source && \
    apk del builds-deps

EXPOSE 9000:9000
ENTRYPOINT [ "node", "server.js" ]
