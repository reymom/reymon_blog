###########
# BUILDER #
###########

FROM node:13.14-alpine as builder

WORKDIR /usr/src/app
COPY ./react_app/package.json .
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
    && apk del .gyp

COPY ./react_app .

ARG API_SERVER
RUN echo ${API_SERVER}
ENV REACT_APP_API_SERVER=${API_SERVER}
RUN REACT_APP_API_SERVER=${API_SERVER} \ 
    npm run build

########
# POST #
########

FROM node:13.14-alpine

WORKDIR /usr/src/app
RUN npm install -g serve
COPY --from=builder /usr/src/app/build ./build