<template>
  <div class="list">
    <!-- list head -->
    <div class="head row">
      <div class="r-left">
        <h1 class="fs-14">播放列表({{audioBar.playList.length || 0}})</h1>
        <span class="ibs c-p-line i-clear">清除</span>
      </div>
      <div class="r-right">
        <h1 class="fs-14 f-thide">{{$u.getProp(audioBar.song, 'name', '歌词')}}</h1>
        <span class="ibs c-p i-close" />
      </div>
    </div>
    <!-- list body -->
    <div class="body row">
      <img class="bg-msk" :src="`https://music.163.com/api/img/blur/${$u.getProp(audioBar.song, 'album', {}).pic_str || $u.getProp(audioBar.song, 'album', {}).pic}`" >
      <div class="r-left smoth-scroll">
        <ul class="songs">
          <li
            class="song c-p"
            :class="{playing: item.id === $u.getProp(audioBar.song, 'id', 0)}"
            v-for="item in audioBar.playList"
            :key="item.id"
          >
            <!-- song name -->
            <div class="song-name f-thide">{{ item.name }}</div>
            <!-- operations -->
            <div class="icons">
              <div class="i-wrap">
                <span class="ibs c-p ic delete" />
                <span class="ibs c-p ic download" />
              </div>
            </div>
            <!-- singers -->
            <div class="singers f-thide">
              <template v-for="(singer, i2) in item.artists">
                <span class="singer c-p-line" :key="$u.generateKey(item.id, i2)">{{singer.name}}</span>
                <span class="singer" :key="$u.generateKey(item.id, i2, i2)">{{i2 !== item.artists.length - 1 ? '/' : null}}</span>
              </template>
            </div>
            <!-- duration -->
            <div class="duration">
              {{$u.formatSecond(item.duration, true)}}
            </div>
          </li>
        </ul>
      </div>
      <div class="r-right smoth-scroll" ref="elLyricsContainer" @scroll="handleLyricScroll">
        <div class="lyric">
          <p class="line" :class="{active: LyricIndex === i}" v-for="(line, i) in LyricArr" :key="i">
            {{line.content}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import { State } from 'vuex-class';
import { AudioBarState, ABAction } from '@/stores/audioBar';
import { Song, Lyric, DelayResult } from '@/interfaces';

interface LrcTime {
  formatTime: string;
  millisecond: number;
  content: string;
}

@Component
export default class List extends Vue {

  @State public audioBar!: AudioBarState;

  public lyric: Lyric | null = null;

  // 歌词自动滚动动画的控制
  private lyricScroller: Function | null = null;

  // 是否关闭自动滚动
  private isCloseAutoScrollLyric: boolean = false;
  private isCloseAutoScrollLyricTimer: DelayResult | null = null;

  // 获取默认歌词数组
  get LyricArr(): LrcTime[] {
    const {lyric} = this;
    return this.getLyricArr(this.lyric ? this.lyric.lrc.lyric : undefined);
  }

  // 获取翻译歌词数组
  get TLyricArr(): LrcTime[] {
    const {lyric} = this;
    return this.getLyricArr(lyric && lyric.tlyric ? lyric.tlyric.lyric : undefined);
  }

  // active 歌词的行
  get LyricIndex(): number {
    const {currentTime} = this.audioBar;
    // time offset second
    const timeOffSet = 1.3;
    for (let index = this.LyricArr.length - 1; index >= 0; index--) {
      const element = this.LyricArr[index];
      if ((currentTime + timeOffSet) * 1000 >= element.millisecond) {
        return index;
      }
    }
    return -1;
  }

  // 解析歌词字符串为歌词数组
  public getLyricArr(lyric: string | undefined): LrcTime[] {
    return (lyric || '').split(/[\n\r]/).map((str) => {
      const res = /^\[(\d+:\d+\.?\d+)\](.*)/.exec(str.trim());
      return (res ? {
        formatTime: res[1],
        millisecond: this.$u.format2millisecond(res[1]),
        content: res[2],
      } : undefined) as any;
    }).filter((v) => v !== undefined);
  }

  // 获取歌词
  public fetchLyric(song: Song | null) {
    if (song) {
      this.$u.get(`/lyric?id=${song.id}`)
        .then((res) => {
          this.lyric = res.failMark ? null : res as any;
        });
    } else {
      this.lyric = null;
    }
  }

  // 歌词滚动事件处理
  public handleLyricScroll() {
    this.isCloseAutoScrollLyric = true;
    if (this.isCloseAutoScrollLyricTimer) {
      this.isCloseAutoScrollLyricTimer.cancel();
    }
    // 1.5s 后恢复自动滚动
    this.isCloseAutoScrollLyricTimer = this.$u.delay(() => {
      this.isCloseAutoScrollLyric = false;
    }, 1500);
    // cancel
    this.isCloseAutoScrollLyricTimer.promise.catch(() => void 0);
  }



  public beforeMount() {
    // first fetch lyric
    this.fetchLyric(this.audioBar.song);
  }

  // mounted() {
  //   setTimeout(() => {
  //     const clear = this.$u.controlScroll(this.$refs.elLyricsContainer as any, 4000, 200)
  //     setTimeout(() => {
  //       clear()
  //     }, 1000);
  //   }, 2000);
  // }

  @Watch('audioBar.song')
  public onSongChange(val: Song | null) {
    // 歌曲切换
    this.fetchLyric(val);
  }

  @Watch('LyricIndex')
  public onLyricIndexChange(val: number) {
    // TODO 多行优化
    const LINE_HEIGHT = 32;
    const elContainer = this.$refs.elLyricsContainer as HTMLDivElement;
    const scrollMax = elContainer.scrollHeight - elContainer.clientHeight;
    const target = (val - 3) * LINE_HEIGHT;
    if (0 < target && target <= scrollMax && !this.isCloseAutoScrollLyric) {
      this.lyricScroller = this.$u.controlScroll(elContainer, 300, target);
    }
  }
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>

