#!/bin/bash

WEB_DIR=$(pwd)/web

(cd $WEB_DIR && yarn install && yarn build)

ASSET_DIR=$WEB_DIR/build cargo build
