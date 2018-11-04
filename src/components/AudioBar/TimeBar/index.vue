<template>
  <div class="time-bar">
    <div class="line">
      <div class="ready" />
      <div class="current">
        <span class="ibs c-p drag-point" />
      </div>
    </div>
    <div class="counter fs-12">
      <span class="ibs curr">{{'09:23'}}</span>
      <span class="ibs duration">&nbsp;/&nbsp;{{'90:23'}}</span>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * 播放条上的进度条
 */
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class TimeBar extends Vue {

}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
