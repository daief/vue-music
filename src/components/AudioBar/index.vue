<template>
  <div class="audio-bar" :class="{unlock}">
    <!-- audio -->
    <audio
      id="player"
      crossOrigin="anonymous"
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
				<span @click="handleClickPre" class="ibs c-p ctrl pre"/>
				<span @click="handleClickTogglePlay" class="ibs c-p ctrl" :class="[audioBar.isPlaying ? 'pause' : 'play']" />
				<span @click="handleClickNext" class="ibs c-p ctrl next"/>
			</div>

      <!-- 歌曲图片 -->
      <div class="music-cover">
        <router-link :to="`/discover/song?id=${$u.getProp(audioBar.song, 'id', '')}`">
          <img class="c-p" :src="`${$u.getProp(audioBar.song, 'album', {}).picUrl}?param=34y34`" alt="">
        </router-link>
      </div>

      <!-- 文本、进度条信息 -->
      <div class="center">
        <!-- 信息 -->
        <div class="texts">
          <!-- 歌名 -->
          <router-link :to="`/discover/song?id=${$u.getProp(audioBar.song, 'id', '')}`">
            <span class="ibs c-p-line f-thide fs-12 song">{{$u.getProp(audioBar.song, 'name', '')}}</span>
          </router-link>

          <!-- 歌手 -->
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
      <span class="ibs c-p fs-12 i-list" @click="handleToggleShowList">
        {{audioBar.playList.length}}
        <span v-show="audioBar.isShowMessage" class="message">{{audioBar.message}}</span>
      </span>

      <transition name="transition-fade">
        <list v-show="audioBar.isShowList"/>
      </transition>
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
  public unlock: boolean = this.$u.local.getLocalUnLockStatus();

  public songUrl: SongUrl | null = null;

  public loopType: ILoopType = this.$u.local.getLocalLoopType();

  // methods
  public togglePositionLocked() {
    const {$u, unlock} = this;
    this.unlock = !unlock;
    this.$u.local.setLocal($u.local.KEYS.UN_LOCK, this.unlock);
    if (this.unlock) {
      this.$store.dispatch(ABAction('closeAllModal'));
    }
  }

  // --------------------- audio events
  public musicLoadStart() {
    // 开始寻找指定的音频或视频
    this.$store.dispatch(ABAction('setCanplay'), false);
  }

  public musicProgress() {
    // 正在下载指定的音频或视频
    this.$store.dispatch(ABAction('setPlayerBuffered'));
  }

  public musicDurationChange() {
    // 时长已改变
    this.$store.dispatch(ABAction('setDuration'), this.audioBar.player.duration);
  }

  public musicMetadata() {
    // 元数据已加载
  }

  public musicCanplay() {
    // 可以播放
    const {$store, audioBar} = this;
    $store.dispatch(ABAction('setIsWaiting'), false);
    $store.dispatch(ABAction('setCanplay'), true);
    $store.dispatch(ABAction('setPlayerBuffered'));

    if (audioBar.isPlaying) {
      $store.dispatch(ABAction('play'));
    }
  }

  public musicCanplayThrough() {
    // 可以一直不停地播放
  }

  public musicTimeUpdate() {
    // 时间改变
    this.$store.dispatch(ABAction('setCurrentTime'), this.audioBar.player.currentTime);
  }

  public musicWaiting() {
    // 等待数据，并非错误
    this.$store.dispatch(ABAction('setIsWaiting'), true);
  }

  public musicEnded() {
    // 播放结束
    this.$store.dispatch(ABAction('setCanplay'), false);
    this.handleClickNext(undefined, true);
  }

  public musicError(e: any) {
    // 加载错误
    this.$store.dispatch(ABAction('pause'));
  }
  // --------------------- audio events

  /**
   * 切换播放模式
   */
  public handleClickLoopType() {
    const types: ILoopType[] = ['order', 'random', 'one'];
    this.loopType = types[(types.indexOf(this.loopType) + 1) % types.length];
    this.$u.local.setLocal(this.$u.local.KEYS.LOOP_TYPE, this.loopType);
  }

  /**
   * 切换歌单面板展示与否
   */
  public handleToggleShowList() {
    this.$store.dispatch(ABAction('toggleIsShowList'));
  }

  // 上一首
  public handleClickPre() {
    const {loopType, $store, audioBar} = this;
    if (['order', 'one'].includes(loopType)) {
      $store.dispatch(ABAction('listPre'));
    } else if (loopType === 'random') {
      $store.dispatch(ABAction('listRandom'));
    }

    $store.dispatch(ABAction('ctrlAudioLoadAndPlay'), {play: audioBar.isPlaying});
  }

  public handleClickTogglePlay() {
    this.$store.dispatch(ABAction('togglePlay'));
  }

  // 下一首
  public handleClickNext(e?: MouseEvent, autoNext: boolean = false) {
    const {loopType, $store, audioBar} = this;
    if (autoNext && loopType === 'one') {
      // ended 事件调用，单曲播放
      // do nothing
    } else if (['order', 'one'].includes(loopType)) {
      $store.dispatch(ABAction('listNext'));
    } else if (loopType === 'random') {
      $store.dispatch(ABAction('listRandom'));
    }

    $store.dispatch(ABAction('ctrlAudioLoadAndPlay'), {play: audioBar.isPlaying});
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
          return {failMark: true, success: false};
        }
      })
      .then((res) => {
        // `http://music.163.com/song/media/outer/url?id=${id}.mp3`
        this.songUrl = !res.failMark && res.data.length > 0 ? res.data[0] : { url: undefined };
        if (this.songUrl && this.songUrl.url) {
          // success
        } else {
          // 获取 url 失败，无权限等、提示
          this.$store.dispatch(ABAction('showMessage'), '播放失败，从列表移除。');
          // TODO 暂时从列表删除处理
          this.$store.dispatch(ABAction('deleteListSongIdAndPlay'), song.id);
        }
      });
    } else {
      this.songUrl = null;
    }
  }

  public initPlayer() {
    // 获取 audio 元素
    const elAudio = document.getElementById('player') as HTMLAudioElement;
    this.$store.dispatch(ABAction('setPlayer'), elAudio);
    elAudio.volume = this.$u.local.getLocalVolume();
  }

  // --------------------- life cycle
  public beforeMount() {
    this.checkAndFetchSongUrl(this.audioBar.song);
  }

  public mounted() {
    this.initPlayer();
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

