#!/bin/bash

BUILD_ENV=${1:-production}
set -x
declare -A PORT_MAPS=( \
  ["test"]=7301 \
  ["dev"]=7302 \
  ["staging"]=7303 \
  ["production"]=7304 \
)

echo $BUILD_ENV
docker build --build-arg BUILD_ENV=${BUILD_ENV} -t incognito/incognito-webview-chart:${BUILD_ENV} .
docker stop incognito-webview-chart-${BUILD_ENV}
docker rm incognito-webview-chart-${BUILD_ENV}
docker run -d --restart always --name incognito-webview-chart-${BUILD_ENV} -p 127.0.0.1:${PORT_MAPS[${BUILD_ENV}]}:80 incognito/incognito-webview-chart:${BUILD_ENV}
