<template>
  <div class="list">
    <!-- list head -->
    <div class="head row">
      <div class="r-left">
        <h1 class="fs-14">播放列表(111)</h1>
        <span class="ibs c-p-line i-clear">清除</span>
      </div>
      <div class="r-right">
        <h1 class="fs-14 f-thide">歌曲名称</h1>
        <span class="ibs c-p i-close" />
      </div>
    </div>
    <!-- list body -->
    <div class="body row">
      <img class="bg-msk" src="https://music.163.com/api/img/blur/3300733912593978" >
      <div class="r-left">

      </div>
      <div class="r-right">

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class List extends Vue {

}
</script>

<style lang="less" scoped>
@import './style.less';
</style>

