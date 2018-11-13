<template>
  <div class="header-bar">
    <div class="content">
      <router-link class="ibs c-p logo" to="/discover"></router-link>
      <router-link class="ibs c-p fs-14 m-item" to="/discover">发现音乐</router-link>
      <router-link class="ibs c-p fs-14 m-item" to="/my">我的音乐</router-link>
      <router-link class="ibs c-p fs-14 m-item" to="/friends">朋友</router-link>
      <router-link class="ibs c-p fs-14 m-item" to="/musician">音乐人</router-link>
      <router-link class="ibs c-p fs-14 m-item" to="/download">下载客户端</router-link>
    </div>
    <div class="sub-menu" v-if="/discover\//.test($route.name)">
      <div class="wrap">
        <router-link class="ibs c-p fs-12 m-item" to="/discover">
          <span>推荐</span>
        </router-link>
        <router-link class="ibs c-p fs-12 m-item" to="/discover/toplist">
          <span>排行榜</span>
        </router-link>
        <router-link class="ibs c-p fs-12 m-item" to="/discover/playlist">
          <span>歌单</span>
        </router-link>
      </div>
    </div>
    <div class="red-line" v-else />
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class Header extends Vue {

}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>

