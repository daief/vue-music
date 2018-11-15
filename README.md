# vue-music

## 介绍
使用 vue、vue-router、vuex，山寨一个网易云音乐的 pc 网页版，仅用于个人学习，借此认识前端模块化编程、单页应用、webpack 资源打包等概念。
后来学习了 TypeScript，加上相对 Vue 作个复习，计划使用 Vue 2、Vue CLI 3+、TypeScript 将项目进行重新编写。

目录介绍：
- `NeteaseCloudMusicApi/` 是 api 服务，提供网易云音乐接口
- `preview/` 预览截图
- 其他目录为 Vue CLI 3+ 生成的结构

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

访问 [http://localhost:8080/](http://localhost:8080/)。

## TypeScript 重写
于 2018-11-02 开始用 TypeScript 重写工程，龟速推进中......
- [x] 底部歌曲播放条
  - [x] 暂停、播放、上下首切换
  - [x] 自定义歌曲进度条、进度调节
  - [x] 音量调节
  - [x] 切换播放模式
  - [x] 歌词滚动
  - [x] 列表歌曲切换、删除
  - [x] 加了个简单的音乐波形跳动


<!-- 界面 -->
![](./preview/view.png)
