<template>
  <div class="audio-bar" :class="{unlock}">
    <!-- audio -->
    <audio
      id="player"
      src="https://m10.music.126.net/20181101231425/c107b45496ff8eb7fc546e85a86a781b/ymusic/0b5c/1667/1b20/c7a8b01226aff9d1ac1159a7b0a2da27.mp3"
      preload
			@loadstart="musicLoadStart"
      @progress="musicProgress"
			@durationchange="musicDurationChange"
			@loadedmetadata="musicMetadata"
			@canplay="musicCanplay"
      @canplaythrough="musicCanplayThrough"
			@timeupdate="musicTimeUpdate"
      @waiting="musicWaiting"
			@ended="musicEnded"
			@error="musicError"
    />

    <!-- 位置锁定 -->
    <div class="position-lock">
      <span class="ibs c-p ctr-lock" :class="{unlock}" @click="togglePositionLocked" />
    </div>

    <!-- content -->
    <div class="wrap">
      <!-- 播放、上下首按钮 -->
			<div class="control-btns">
				<span @click="clickPre" class="ibs c-p ctrl pre"/>
				<span @click="clickTogglePlay" class="ibs c-p ctrl" :class="[audioBar.isPlaying ? 'pause' : 'play']" />
				<span @click="clickNext" class="ibs c-p ctrl next"/>
			</div>

      <!-- 歌曲图片 -->
      <div class="music-cover">
        <img class="c-p" src="http://p1.music.126.net/gK0nqK8iiG1o6axkHmmqrQ==/109951163416312552.jpg?param=34y34" alt="">
      </div>

      <!-- 文本、进度条信息 -->
      <div class="center">
        <!-- 信息 -->
        <div class="texts">
          <span class="ibs c-p-line f-thide fs-12 song">{{'歌名'}}</span>
          <div class="fs-12 f-thide singers">
            <span class="ibs c-p-line singer">{{'singer1'}}</span>
            <span class="ibs">/</span>
            <span class="ibs c-p-line singer">{{'singer2'}}</span>
          </div>
        </div>
        <!-- 进度条 -->
        <time-bar />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * 底部播放条
 */
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { AudioBarState } from '@/stores/audioBar';
import TimeBar from './TimeBar/index.vue';

// audio bar action
const ABAction = (name: string) => `audioBar/${name}`;

@Component({
  components: {
    TimeBar,
  },
})
export default class AudioBar extends Vue {
  // states of store
  @State public audioBar!: AudioBarState;

  // data
  public unlock: boolean = false;

  // methods
  public togglePositionLocked() {
    this.unlock = !this.unlock;
  }

  // --------------------- audio events
  public musicLoadStart() {
    // 开始寻找指定的音频或视频
    console.log('loadStart');
    this.$store.dispatch(ABAction('setCanplay'), false);
  }

  public musicProgress() {
    // 正在下载指定的音频或视频
    console.log('progress');
  }

  public musicDurationChange() {
    // 时长已改变
    console.log('duration change');
    this.$store.dispatch(ABAction('setDuration'), this.audioBar.player.duration);
  }

  public musicMetadata() {
    // 元数据已加载
    console.log('meta data');
  }

  public musicCanplay() {
    // 可以播放
    console.log('can play');
    this.$store.dispatch(ABAction('setCanplay'), true);
  }

  public musicCanplayThrough() {
    // 可以一直不停地播放
    console.log('can play through');
  }

  public musicTimeUpdate() {
    // 时间改变
    console.log('time update');
    this.$store.dispatch(ABAction('setCurrentTime'), this.audioBar.player.currentTime);
  }

  public musicWaiting() {
    // 等待数据，并非错误
    console.log('waiting');
  }

  public musicEnded() {
    // 播放结束
    console.log('end');
  }

  public musicError() {
    // 加载错误
    console.log('error');
  }
  // --------------------- audio events

  public clickPre() {
    console.log('pre');
  }

  public clickTogglePlay() {
    console.log('toggle play');
    this.$store.dispatch(ABAction('togglePlay'));
  }

  public clickNext() {
    console.log('next');
  }

  // life cycle
  public mounted() {
    this.$store.dispatch(ABAction('setPlayer'), document.getElementById('player'));
  }
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>

