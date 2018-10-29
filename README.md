# vue-music

## 介绍
使用 vue、vue-router、vuex，山寨一个网易云音乐的 pc 网页版，仅用于个人学习，借此认识前端模块化编程、单页应用、webpack 资源打包等概念。
- `NeteaseCloudMusicApi/` 是 api 服务，提供网易云音乐接口
- `preview/` 预览截图

## api 服务来源
[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

## 学习记录
https://daief.github.io/2017-09-04/record-of-vue-music.html

## 本地启动
```bash
# 安装 api 服务
$ cd NeteaseCloudMusicApi && yarn
# 启动服务
$ node app.js

# 安装 vue-music 依赖
$ yarn
# 启动前端项目
$ yarn serve
```

访问`http://localhost:8080/`。

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

<!-- 界面 -->
![](./preview/view.png)
