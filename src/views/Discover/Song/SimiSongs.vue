<template>
  <div class="simi-songs" v-if="list.length > 0">
    <h1 class="title fs-12">相似歌曲</h1>

    <div v-for="item in list" class="item" :key="item.id">
      <div class="text">
        <router-link
          class="c-p ibs fs-12 f-thide song-name"
          :to="`/discover/song?id=${item.id}`"
          :title="item.name"
        >
          {{item.name}}
        </router-link>

        <p v-for="(ar, index) in item.artists" :key="ar.id" class="artists">
          <router-link
            class="c-p ibs fs-12 f-thide artist-name"
            :to="`/artist`"
            :title="ar.name"
          >
            {{ar.name}}
          </router-link>
          <span v-if="index < item.artists.length - 1">/</span>
        </p>
      </div>

      <span class="c-p ic iconfont play" @click="handleClickPlay(item)">&#xe616;</span>
      <span class="c-p ic iconfont add" @click="handleClickAdd(item)">&#xe649;</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Song } from '@/interfaces';
import { ABAction } from '@/stores/audioBar';

@Component
export default class SimiList extends Vue {
  @Prop({
    type: Number,
    required: true,
  }) public id!: number;

  public list: Song[] = [];

  public fetchSimiSongs(id: number) {
    return this.$u.get(`/simi/song?id=${id}`)
      .then((res) => {
        this.list = res.failMark ? [] : res.songs;
      });
  }

  public handleClickPlay(s: Song) {
    this.$store.dispatch(ABAction('playANewSong'), s);
  }

  public handleClickAdd(s: Song) {
    this.$store.dispatch(ABAction('addSongToList'), s);
  }

  public mounted() {
    this.fetchSimiSongs(this.id);
  }

  @Watch('id')
  public onIdChnage(newId: number) {
    this.fetchSimiSongs(newId);
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/variables.less";

.simi-songs {
  .title {
    color: #333;
    height: 24px;
    position: relative;
    margin: 0 0 20px;

    &::after {
      .horizontal-1-line(#ccc);
      bottom: 0;
    }
  } // .title

  .item {
    height: 32px;
    line-height: 32px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    position: relative;

    .text {
      width: 156px;

      a {
        max-width: 100%;
      }

      .song-name {
        height: 16px;
        line-height: 16px;
        display: block;
        .set-a(#333);
      } // .song-name

      .artists {
        height: 16px;
        line-height: 16px;
        margin: 0;

        a {
          .set-a(#999);
        }
      } // .artists
    } // .text

    .ic {
      font-size: 20px;
      color: #a3a3a3;
      position: absolute;
      right: 0;

      &:hover {
        color: #999;
      }

      &.play {
        right: 30px;
      }
    } // .ic
  } // .item
} // .simi-songs
</style>

