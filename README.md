# 介绍
使用 vue、vue-router、vuex，山寨一个网易云音乐的 pc 网页版，仅用于个人学习，借此认识前端模块化编程、单页应用、webpack 资源打包等概念。
- `NeteaseCloudMusicApi/` 是 api 服务，提供网易云音乐接口
- `vue-music/` 前端项目代码部分

# api 服务来源
[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

# 启动
```bash
# 安装 api 服务
$ cd NeteaseCloudMusicApi && npm i
# 启动服务
$ node app.js

# 安装 vue-music 依赖
$ cd vue-music && npm i
# 启动前端项目
$ npm start
```

<!-- 界面 -->
![](./preview/view.png)
