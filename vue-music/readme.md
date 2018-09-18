# vue-music
学习使用vue、vue-router、vuex，山寨一个网易云音乐的pc网页版。
~~演示地址~~（个人服务器到期）

## 过程记录
[学习记录](https://daief.github.io/2017-09-04/record-of-vue-music.html)

## vue-cli 脚本说明

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 一些可能会出现的困扰
- 安装 vue-music 依赖时出现错误，有些模块无法直连，可能需要设置镜像链接，部分模块已在`.npmrc`中配置
- API 服务有时会出现`Error: connect ETIMEDOUT`，过一段时间又会恢复
