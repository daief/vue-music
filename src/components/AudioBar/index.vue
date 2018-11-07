<template>
  <div class="audio-bar" :class="{unlock}">
    <!-- audio -->
    <audio
      id="player"
      :src="songUrl && songUrl.url"
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

      <!-- volume -->
      <volume />

      <!-- loop-type -->
      <span class="ibs c-p i-loop order" />

      <!-- list -->
      <span class="ibs c-p fs-12 i-list">{{audioBar.playList.length || 0}}</span>
      <list />
    </div><!-- wrap -->


  </div>
</template>

<script lang="ts">
/**
 * 底部播放条
 */
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { AudioBarState, ABAction } from '@/stores/audioBar';
import TimeBar from './TimeBar/index.vue';
import Volume from './Volume/index.vue';
import List from './List/index.vue';
import { Song, SongUrl } from '@/interfaces';

@Component({
  components: {
    TimeBar,
    Volume,
    List,
  },
})
export default class AudioBar extends Vue {
  // states of store
  @State public audioBar!: AudioBarState;

  // data
  public unlock: boolean = false;

  public songUrl: SongUrl | null = null;

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

  /**
   * 检查并获取歌曲链接
   */
  public checkAndFetchSongUrl(song: Song | null) {
    if (song) {
      const {id} = song;
      this.$u.get(`/check/music?id=${id}`).then((res) => {
        // 检查是否可用
        if (res.failMark) {
          // 接口状态失败
          return {failMark: true, success: true};
        } else {
          return {success: res.success};
        }
      })
      .then((checkRes) => {
        if (checkRes.success) {
          // 成功，通过接口获取 url
          return this.$u.get(`/song/url?id=${id}`);
        } else {
          // 失败
          return {failMark: true};
        }
      })
      .then((res) => {
        // 失败则通过拼接方式尝试获得 url
        this.songUrl = !res.failMark && res.data.length > 0 ? res.data[0] : {
          url: `http://music.163.com/song/media/outer/url?id=${id}.mp3`,
        };
      });
    } else {
      this.songUrl = null;
    }
  }

  // --------------------- life cycle
  public beforeMount() {
    this.checkAndFetchSongUrl(this.audioBar.song);
  }

  public mounted() {
    // 获取 audio 元素
    this.$store.dispatch(ABAction('setPlayer'), document.getElementById('player'));
  }

  @Watch('audioBar.song')
  public onSongChange(val: Song | null) {
    // 歌曲切换
    this.checkAndFetchSongUrl(val);
  }
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>
