<template>
  <div class="time-bar">
    <div class="line" ref="line" @click="handleClickLine">
      <div class="ready" :style="ReadyStyle" />
      <div class="current" :style="CurrentStyle">
        <!-- 进度条滑块 -->
        <span
          class="ibs c-p drag-point"
          @mousedown="handleSliderMouseDown"
        />
      </div>
    </div>
    <div class="counter fs-12">
      <span class="ibs curr">{{this.DisplayCurrentTime}}</span>
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
import {AudioBarState, ABAction } from '@/stores/audioBar';

@Component
export default class TimeBar extends Vue {

  get ReadyStyle() {
    const {duration, bufferedTime} = this.audioBar;
    return {
      width: `${bufferedTime / duration * 100}%`,
    };
  }

  get CurrentStyle() {
    const {duration, currentTime} = this.audioBar;
    return {
      width: this.isDragging ? `${this.convertMoveX2RangePercent() * 100}%` : `${currentTime / duration * 100}%`,
    };
    // return {
    //   width: `${this.DisplayCurrentTime / this.audioBar.duration}%`
    // }
  }

  get DisplayCurrentTime() {
    const {$u, audioBar, isDragging, convertMoveX2RangePercent} = this;
    return $u.formatSecond(isDragging ? convertMoveX2RangePercent() * audioBar.duration : audioBar.currentTime);
  }
  @State public audioBar!: AudioBarState;

  private startX: number = 0;
  private endX: number = 0;
  private allLength: number = 0;
  private isDragging: boolean = false;
  private dragX: number = 0;

  constructor() {
    super();
    // this.$u.formatSecond
  }

  // 鼠标按下
  public handleSliderMouseDown() {
    this.isDragging = true;
  }

  // 鼠标移动
  public handleSliderMouseMove(e: MouseEvent) {
    if (this.isDragging) {
      e.preventDefault();
      this.dragX = e.clientX;
    }
  }

  // 鼠标抬起，拖拽结束、改变当前播放时间
  public handleSliderMouseUp(e: MouseEvent) {
    if (this.isDragging) {
      this.dragX = e.clientX;
      // 改变播放点
      const cTime = this.convertMoveX2RangePercent() * this.audioBar.player.duration;
      this.audioBar.player.currentTime = cTime;
      // 主动改变一下 currentTime，防止进度条滑块跳动的现象
      this.$store.dispatch(ABAction('setCurrentTime'), cTime);
    }
    this.isDragging = false;
  }

  // 点击进度条
  public handleClickLine(e: MouseEvent) {
    this.dragX = e.clientX;
    // 改变播放点
    this.audioBar.player.currentTime = this.convertMoveX2RangePercent() * this.audioBar.player.duration;
  }

  // 转换拖拽 x 点为百分比
  public convertMoveX2RangePercent() {
    const x = this.dragX <= this.startX ? this.startX : (this.dragX >= this.endX ? this.endX : this.dragX);
    return (x - this.startX) / this.allLength;
  }

  public mounted() {
    // bind mouse event to window
    window.addEventListener('mousemove', this.handleSliderMouseMove);
    window.addEventListener('mouseup', this.handleSliderMouseUp);
    const rects = (this.$refs.line as HTMLDivElement).getBoundingClientRect();
    this.startX = rects.left;
    this.endX = rects.right;
    this.allLength = rects.width;
  }

  public beforeDestroy() {
    window.removeEventListener('mousemove', this.handleSliderMouseMove);
    window.removeEventListener('mouseup', this.handleSliderMouseUp);
  }
}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
