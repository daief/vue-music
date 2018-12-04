<template>
  <div class="song-info">
    <div class="left">
      <div class="cover-wrap">
        <img class="cover" :src="SongAlbum.picUrl" >
        <span class="ibs mask" />
      </div>

      <div class="out">
        <!-- TODO -->
        🎵<router-link to="/outchain">生成外链播放器</router-link>
      </div>
    </div>

    <div class="right">
      <!-- 歌名 -->
      <div class="name">{{$u.getProp(song, 'name', '')}}</div>

      <!-- 别名 -->
      <div class="alia fs-14" v-if="$u.getProp(song, 'alia', []).length > 0">
        {{song.alia[0]}}
      </div>

      <p class="artists">
        歌手：
        <template v-for="(artist, index) in $u.getProp(song, 'ar', [])">
          <router-link :to="`/artist?id=${artist.id}`" :key="`0-${index}`">{{artist.name}}</router-link>
          <span v-if="index < $u.getProp(song, 'ar', []).length - 1" :key="`1-${index}`"> / </span>
        </template>
      </p>

      <p class="album">
        所属专辑：
        <router-link :to="`/album?id=${SongAlbum.id}`">{{SongAlbum.name}}</router-link>
      </p>

      <div class="ops">
        <span class="ibs c-p play" @click="handleClickPlaySong">
          <span class="ibs c-p ct">播放</span>
        </span>
        <span class="ibs c-p add" @click="handleClickAddSong" />
      </div>

      <div class="lyrics">
        <p v-for="(line, index) in LyricArr" :key="index" class="line">{{line}}</p>
        <p v-if="LyricArr.length === 0" class="line">纯音乐，无歌词</p>
        <p v-else class="c-p">
          <span @click="isExpand = !isExpand">{{isExpand ? '收起⬆️' : '展开⬇️'}}</span>
        </p>
        <!-- 歌词作者 -->
        <p class="lyric-user">
          <span v-if="!!lyric.lyricUser">
            贡献歌词：<router-link to="/user">{{lyric.lyricUser.nickname}}</router-link>
          </span>
          <span v-if="!!lyric.transUser">
            贡献翻译：<router-link to="/user">{{lyric.transUser.nickname}}</router-link>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Lyric, PlayListTrack, Album } from '@/interfaces';
import { ABAction } from '@/stores/audioBar';

const emptyLyric: Lyric = {
  tlyric: {
    lyric: '',
    version: '',
  },
  lrc: {
    lyric: '',
    version: '',
  },
};

@Component
export default class SongInfo extends Vue {
  @Prop({
    type: Number,
    required: true,
  }) public id!: number;

  public lyric: Lyric = emptyLyric;
  public song: PlayListTrack | null = null;

  public isExpand: boolean = false;

  // 获取歌词内容数组
  get LyricArr() {
    const {lyric} = this;
    const lrc = this.$u.getLyricArr(lyric && lyric.lrc ? lyric.lrc.lyric : undefined);
    const tLrc = this.$u.getLyricArr(lyric && lyric.tlyric ? lyric.tlyric.lyric : undefined);
    const result: string[] = [];

    tLrc.length > 0
      // 存在歌词翻译
      ? lrc.map((item, idx) => {
        const tLrcItem = tLrc.find((val) => val.millisecond === item.millisecond);
        result.push(item.content);
        if (tLrcItem) { result.push(tLrcItem.content); }
      })
      // 不存在
      : lrc.map((item, idx) => {
        result.push(item.content);
      });

    return this.isExpand ? result : result.slice(0, 12);
  }

  /**
   * 获取专辑
   */
  get SongAlbum(): Album {
    return this.$u.getProp(this.song, 'al', {});
  }

  /**
   * 请求歌词
   */
  public fetchLyric(id: number) {
    return this.$u.get(`/lyric?id=${id}`)
      .then((res) => {
        this.lyric = res.failMark || res.nolyric === true ? emptyLyric : res as any;
        this.isExpand = false;
      });
  }

  /**
   * 请求歌曲详情
   */
  public fetchSongDetail(id: number) {
    this.$u.get(`/song/detail?ids=${id}`)
      .then((res) => {
        this.song = res.failMark ? null : this.$u.getProp(res.songs, '0', null);
      });
  }

  /**
   * 点击播放歌曲
   */
  public handleClickPlaySong() {
    if (this.song) { this.$store.dispatch(ABAction('playANewSong'), this.song); }
  }

  /**
   * 点击添加歌曲
   */
  public handleClickAddSong() {
    if (this.song) { this.$store.dispatch(ABAction('addSongToList'), this.song); }
  }

  public mounted() {
    this.fetchLyric(this.id);
    this.fetchSongDetail(this.id);
  }

  @Watch('id')
  public onIdChange(newVal: number) {
    this.fetchLyric(newVal);
    this.fetchSongDetail(newVal);
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/variables.less';

.song-info {
  display: flex;
  padding: 40px 30px 40px 39px;

  .left {
    .cover-wrap {
      @size: 205px;

      width: @size;
      height: @size;
      line-height: @size;
      text-align: center;
      position: relative;

      .cover {
        width: 130px;
        height: 130px;
        display: inline-block;
        vertical-align: middle;
      }

      .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: @size;
        height: @size;
        background: url("~@/assets/images/coverall.png") no-repeat;
        background-position: -140px -580px;
      }
    } // .cover-wrap

    .out {
      margin-top: 20px;
      text-align: center;
      color: #0c73c2;

      a {
        .set-a(#0c73c2, #0c73c2, #0c73c2, underline);
      }
    }
  } // .left

  .right {
    width: 414px;
    margin-left: 25px;

    .name {
      font-size: 24px;
      line-height: 24px;
      margin: 0;

      &::before {
        content: "";
        display: inline-block;
        vertical-align: top;
        height: 24px;
        width: 54px;
        margin-right: 10px;
        background-image: url("~@/assets/images/icon.png");
        background-repeat: no-repeat;
        background-position: 0 -463px;
      }
    } // .name

    .alia {
      margin-left: 64px;
      line-height: 18px;
      margin-top: 3px;
      color: #bababa;
    } // .alia

    .artists, .album {
      color: #999;
      margin: 10px 0;

      a {
        .set-a(#0c73c2);
      }
    }

    .ops {
      margin-bottom: 35px;

      .play, .add {
        width: 31px;
        height: 31px;
        line-height: 31px;
        text-align: center;
        color: #fff;
        background-image: url("~@/assets/images/button2.png");
        vertical-align: top;
      }

      .play {
        width: 66px;
        background-position: right, -428px;

        &:hover {
          background-position: right -510px;

          .ct {
            background-position: 0 -469px;

            &::before {
              background-position: -28px -1622px;
            }
          }
        }

        .ct {
          width: 66px;
          height: 31px;
          .set-bg('~@/assets/images/button2.png', 0, -387px);

          &:before {
            content: "";
            display: inline-block;
            width: 20px;
            height: 18px;
            vertical-align: -5px;
            margin-right: 2px;
            .set-bg('~@/assets/images/button2.png', 0, -1622px);
          }
        }
      } // .play

      .add {
        background-position: 0 -1588px;

        &:hover {
          background-position: -40px -1588px;
        }
      } // .add
    } // .ops

    .lyrics {
      .line {
        line-height: 23px;
        color: #333;
        margin: 0;
      }

      .lyric-user {
        text-align: right;
        margin-top: 40px;
        span {
          margin-left: 10px;

          a {
            .set-a(#0c73c2, #0c73c2, #0c73c2, underline);
          }
        }
      } // .lyric-user
    } // .lyrics
  } // .right
} // .song-info
</style>
