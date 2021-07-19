#!/bin/sh
set -e

# 清理旧代码
rm -rf ./node
rm -rf dist/

# 安装项目依赖
npm install --no-optional

# 构建项目，多个项目这边可以填写多个或者在script中填写多个
npm run build

# 集成node服务最新代码
cp -rf node_modules/@keepfe/plugin-node/lib ./node
cp ./kfe-entries/apps.js ./node/apps.js
cd ./node
cp -rf ../dist/* webapps/
npm i

# 打包
touch ../keepva.tar
tar cf ../keepva.tar \
    --exclude=./keepva.tar \
    ./



