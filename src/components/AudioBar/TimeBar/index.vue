<template>
  <div class="time-bar">
    <div class="line">
      <div class="ready" />
      <div class="current">
        <span class="ibs c-p drag-point" />
      </div>
    </div>
    <div class="counter fs-12">
      <span class="ibs curr">{{$u.formatSecond(audioBar.currentTime)}}</span>
      <span class="ibs duration">&nbsp;/&nbsp;{{$u.formatSecond($u.getProp(audioBar.song, 'duration', 0), true)}}</span>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * 播放条上的进度条
 */
import {Component, Vue} from 'vue-property-decorator';
import {State} from 'vuex-class';
import {AudioBarState } from '@/stores/audioBar';

@Component
export default class TimeBar extends Vue {
  @State public audioBar!: AudioBarState;

  constructor() {
    super();
    // this.$u.formatSecond
  }

}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
