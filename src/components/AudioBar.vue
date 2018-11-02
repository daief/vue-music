<template>
  <div class="audio-bar" :class="{unlock}">
    <!-- audio -->
    <audio
      id="player"
      src="https://m10.music.1261.net/20181101231425/c107b45496ff8eb7fc546e85a86a781b/ymusic/0b5c/1667/1b20/c7a8b01226aff9d1ac1159a7b0a2da27.mp3"
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
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue } from 'vue-property-decorator';
import {State} from 'vuex-class';
import { AudioBarState } from '@/stores/audioBar';

// audio bar action
const ABAction = (name: string) => `audioBar/${name}`;

@Component
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
  @import "~@/styles/variables.less";

  @img-playbar: "../assets/images/playbar.png";
  @bar-height: 53px;

  .audio-bar {
		height: @bar-height;
    position: relative;
    transition: all .7s;

    #player {
      display: none;
    }

    &.unlock {
      height: 7px;
    }

    &:hover {
      height: @bar-height;
      transition-duration: .4s;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 67px;
      z-index: -1;
      background-position: 0 5px;
      background: url(@img-playbar) repeat-x;
    }

    &::after {
      content: "";
      position: absolute;
      width: 15px;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: -1;
      background-position: 0 5px;
      background: url(@img-playbar) repeat-x;
    }

    .position-lock {
      position: absolute;
      top: -14px;
      right: 15px;
      width: 52px;
      height: 67px;
      background: url(@img-playbar) no-repeat 0 9999px;
      background-position: 0 -380px;

      .ctr-lock {
        background: url(@img-playbar) no-repeat 0 9999px;
        background-position: -100px -380px;
        width: 18px;
        height: 18px;
        margin-top: 6px;

        &:hover {
          background-position: -100px -400px;
        }

        &.unlock {
          background-position: -80px -380px;
        }

        &.unlock:hover {
          background-position: -80px -400px;
        }
      } // .ctr-lock
    } // .position-lock

    .wrap {
      width: @content-width;
      height: 47px;
      margin: 0 auto;
      margin-top: @bar-height - 47px;
      position: relative;

      @inner-h: 42px;

      .control-btns {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 136px;
        height: 36px;
        padding-top: @inner-h - 36px;

        .small() {
          width: 28px;
          height: 28px;
          margin-left: 8px;
          margin-right: 8px;
        }

        .main() {
          height: 36px;
          width: 36px;
        }

        .ctrl {
          background: url(@img-playbar) no-repeat;

          &.pre {
            .small();
            background-position: 0 -130px;
            &:hover {
              background-position: -30px -130px;
            }
          } // .pre

          &.next {
            .small();
            background-position: -80px -130px;
            &:hover {
              background-position: -110px -130px;
            }
          } // .next

          &.play {
            .main();
            background-position: 0px -204px;

            &:hover {
              background-position: -40px -204px;
            }
          } // .play

          &.pause {
            .main();
            background-position: 0 -165px;

            &:hover {
              background-position: -40px -165px;
            }
          } // .pause
        }
      } // .control-btns
    } // .wrap
  } // .audio-bar
</style>

