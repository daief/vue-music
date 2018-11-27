<template>
  <div class="list">
    <!-- list head -->
    <div class="head row">
      <div class="r-left">
        <h1 class="fs-14">播放列表({{audioBar.playList.length || 0}})</h1>
        <span class="ibs c-p-line ic switch" @click="handleClickSwitchViewSong">切换</span>
        <span class="ibs c-p-line ic clear" @click="handleClickDeleteAll">清除</span>
      </div>
      <div class="r-right">
        <h1 class="fs-14 f-thide">{{$u.getProp(audioBar.song, 'name', '歌词')}}</h1>
        <span class="ibs c-p i-close" @click="handleClickCloseListPanel" />
      </div>
    </div>
    <!-- list body -->
    <div class="body row">
      <img class="bg-msk" :src="`https://music.163.com/api/img/blur/${$u.getProp(audioBar.song, 'album', {}).pic_str || $u.getProp(audioBar.song, 'album', {}).pic}`" >
      <div v-show="!isShowViewSong" class="r-left smoth-scroll">

        <!-- song list -->
        <RecycleScroller
          v-if="audioBar.playList.length > 0"
          class="songs"
          :items="audioBar.playList"
          :item-height="28"
        >
          <div
            slot-scope="{ item }"
            :id="`song-${item.id}`"
            class="song c-p"
            :class="{playing: item.id === $u.getProp(audioBar.song, 'id', 0)}"
            v-for="item in audioBar.playList"
            :key="item.id"
            @click="handleClickSong(item.id)"
          >
            <!-- song name -->
            <div class="song-name f-thide">{{ item.name }}</div>
            <!-- operations -->
            <div class="icons">
              <div class="i-wrap">
                <span class="ibs c-p ic delete" @click="handleClickDeleteSong($event, item.id)" />
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
          </div>
        </RecycleScroller>

        <!-- no songs -->
        <div v-else class="songs-empty">
          <p class="tip1"><span class="ibs i-face" />你还没有添加任何歌曲。</p>
        </div>
      </div>
      <!-- show view song -->
      <div v-show="isShowViewSong" class="r-left smoth-scroll">
        <view-song :show="isShowViewSong" />
      </div>

      <!-- right part -->
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
import ViewSong from '@/components/AudioBar/List/ViewSong/index.vue';

interface LrcTime {
  formatTime: string;
  millisecond: number;
  content: string;
}

@Component({
  components: {
    ViewSong,
  },
})
export default class List extends Vue {

  @State public audioBar!: AudioBarState;

  public lyric: Lyric | null = null;

  public isShowViewSong: boolean = false;

  // 歌词自动滚动动画的控制
  private lyricScroller: (() => void) | null = null;

  // 是否关闭自动滚动
  private isCloseAutoScrollLyric: boolean = false;
  private isCloseAutoScrollLyricTimer: DelayResult | null = null;
  // 是否正在自动滚动
  private isAutoScrollLyric: boolean = false;

  // 获取默认歌词数组
  get LyricArr(): LrcTime[] {
    const {lyric} = this;
    return this.getLyricArr(lyric ? lyric.lrc.lyric : undefined);
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
    const result: LrcTime[] = [];

    (lyric || '').split(/[\n\r]/).map((str) => {
      const reg = /\[(\d+:\d+\.?\d+)\]/g;
      const content = str.trim().replace(reg, '');
      let res: null | string[] = null;

      while (true) {
        res = reg.exec(str.trim());
        if (!res) {
          break;
        }

        result.push({
          formatTime: res[1],
          millisecond: this.$u.format2millisecond(res[1]),
          content,
        });
      }
    });

    return result.sort((a, b) => a.millisecond - b.millisecond);
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

  // 滚动歌词到指定（？激活）行
  public scrollLyricToActive(line?: number) {
    // TODO 多行优化
    // 不满足滚动的条件
    // 关闭、歌曲未播放、面板未显示
    const {audioBar} = this;
    if (this.isCloseAutoScrollLyric || !audioBar.isPlaying || !audioBar.isShowList) {
      return;
    }
    if (this.lyricScroller) { this.lyricScroller(); }
    const actualLine = line !== undefined ? line : this.LyricIndex;
    const LINE_HEIGHT = 32;
    const elContainer = this.$refs.elLyricsContainer as HTMLDivElement;
    const scrollMax = elContainer.scrollHeight - elContainer.clientHeight;
    let target = (actualLine - 3) * LINE_HEIGHT;
    target = 0 < target ? target : 0;
    target = target <= scrollMax ? target : scrollMax;
    // 执行滚动
    this.isAutoScrollLyric = true;
    this.lyricScroller = this.$u.controlScroll({
      el: elContainer,
      duration: 300,
      y: target,
      endCall: () => {
        this.isAutoScrollLyric = false;
      },
    });
  }

  // TODO (滚动到列表底部的歌曲的BUG) 滚动到当前歌曲
  public scrollToPlayingSong() {
    // async
    this.$u.delay(() => {
      const elSong = document.getElementById(`song-${this.$u.getProp(this.audioBar.song, 'id', 0)}`);
      if (elSong) {
        elSong.scrollIntoView({
          behavior: 'instant',
        });
      }
    }, 10);
  }

  // 歌词滚动事件处理
  public handleLyricScroll() {
    if (this.isAutoScrollLyric) { return; }
    // 主动滚动时屏蔽自动滚动
    this.isCloseAutoScrollLyric = true;
    if (this.isCloseAutoScrollLyricTimer) {
      this.isCloseAutoScrollLyricTimer.cancel();
    }
    // 2.5s 后恢复自动滚动且滚动到指定行
    this.isCloseAutoScrollLyricTimer = this.$u.delay(() => {
      this.isCloseAutoScrollLyric = false;
      this.scrollLyricToActive();
    }, 2500);
    // cancel
    this.isCloseAutoScrollLyricTimer.promise.catch(() => void 0);
  }

  // 点击列表单曲，切换歌曲并播放
  public handleClickSong(id: number) {
    this.$store.dispatch(ABAction('listSongIdAndPlay'), id);
  }

  // 点击列表单曲删除，若是当前歌曲进行切换
  public handleClickDeleteSong(e: MouseEvent, id: number) {
    e.stopPropagation();
    this.$store.dispatch(ABAction('deleteListSongIdAndPlay'), id);
  }

  // 切换音频可视化面板
  public handleClickSwitchViewSong() {
    this.isShowViewSong = !this.isShowViewSong;
    if (!this.isShowViewSong) {
      // 滚动歌曲
      this.scrollToPlayingSong();
    }
  }

  // 清空播放列表
  public handleClickDeleteAll() {
    this.$store.dispatch(ABAction('setPlayList'), []);
  }

  // 关闭列表面板
  public handleClickCloseListPanel() {
    this.$store.dispatch(ABAction('toggleIsShowList'));
  }

  public beforeMount() {
    // first fetch lyric
    this.fetchLyric(this.audioBar.song);
  }

  // 歌曲切换
  @Watch('audioBar.song')
  public onSongChange(val: Song | null) {
    this.fetchLyric(val);
  }

  // 歌曲播放行索引变化
  @Watch('LyricIndex')
  public onLyricIndexChange(val: number) {
    this.scrollLyricToActive(val);
  }

  // 面板显示、隐藏状态变化
  @Watch('audioBar.isShowList')
  public onIsShowListChange(val: boolean) {
    if (val) {
      // 显示了，1. 滚动到当前歌曲，2. 滚动到当前歌词
      this.scrollLyricToActive();
      // TDDO bug 元素在底部时整个父级错位了
      this.scrollToPlayingSong();
    }
  }
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>

