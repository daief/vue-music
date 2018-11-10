<template>
  <div class="audio-bar" :class="{unlock}">
    <!-- audio -->
    <audio
      id="player"
      :src="$u.getProp(songUrl, 'url', '')"
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
        <img class="c-p" :src="`${$u.getProp(audioBar.song, 'album', {}).picUrl}?param=34y34`" alt="">
      </div>

      <!-- 文本、进度条信息 -->
      <div class="center">
        <!-- 信息 -->
        <div class="texts">
          <span class="ibs c-p-line f-thide fs-12 song">{{$u.getProp(audioBar.song, 'name', '')}}</span>
          <div class="fs-12 f-thide singers">
            <template v-for="(singer, si) in $u.getProp(audioBar.song, 'artists', [])">
              <span class="ibs c-p-line singer" :key="$u.generateKey(si)">{{singer.name}}</span>
              <span class="ibs" :key="$u.generateKey(si, si)">{{si !== $u.getProp(audioBar.song, 'artists', []).length - 1 ? '/' : null}}</span>
            </template>
          </div>
        </div>
        <!-- 进度条 -->
        <time-bar />
      </div>

      <!-- volume -->
      <volume />

      <!-- loop-type -->
      <span class="ibs c-p i-loop" :class="loopType" @click="handleClickLoopType"/>

      <!-- list -->
      <span class="ibs c-p fs-12 i-list" @click="handleToggleShowList">{{audioBar.playList.length}}</span>
      <list v-show="audioBar.isShowList" />
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

type ILoopType = 'order' | 'random' | 'one';

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

  public loopType: ILoopType = 'order';

  // methods
  public togglePositionLocked() {
    this.unlock = !this.unlock;
  }

  // --------------------- audio events
  public musicLoadStart() {
    console.log('musicLoadStart');
    // 开始寻找指定的音频或视频
    this.$store.dispatch(ABAction('setCanplay'), false);
  }

  public musicProgress() {
    // 正在下载指定的音频或视频
    console.log('musicProgress');
    this.$store.dispatch(ABAction('setPlayerBuffered'));
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
    this.$store.dispatch(ABAction('setIsWaiting'), false);
    this.$store.dispatch(ABAction('setCanplay'), true);
    this.$store.dispatch(ABAction('setPlayerBuffered'));
  }

  public musicCanplayThrough() {
    // 可以一直不停地播放
    console.log('can play through');
  }

  public musicTimeUpdate() {
    // 时间改变
    this.$store.dispatch(ABAction('setCurrentTime'), this.audioBar.player.currentTime);
  }

  public musicWaiting() {
    // 等待数据，并非错误
    console.log('waiting');
    this.$store.dispatch(ABAction('setIsWaiting'), true);
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

  /**
   * 切换播放模式
   */
  public handleClickLoopType() {
    const types: ILoopType[] = ['order', 'random', 'one'];
    this.loopType = types[(types.indexOf(this.loopType) + 1) % types.length];
  }

  /**
   * 切换歌单面板展示与否
   */
  public handleToggleShowList() {
    this.$store.dispatch(ABAction('toggleIsShowList'));
  }

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
  public onSongChange(val: Song | null, old: Song | null) {
    if (val && (old && val.id !== old.id)) {
      // 歌曲切换
      this.checkAndFetchSongUrl(val);
    }
  }
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>

