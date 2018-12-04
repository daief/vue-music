<template>
  <div class="simi-list" v-if="list.length > 0">
    <h1 class="title fs-12">包含这首歌的歌单</h1>

    <div v-for="item in list" class="item" :key="item.id">
      <router-link class="ibs c-p cover" :to="`/discover/playlist?id=${item.id}`">
        <img :src="`${item.coverImgUrl}?param=50y50`" :title="item.name">
      </router-link>
      <div class="text">
        <router-link
          class="c-p fs-14 f-thide name"
          :to="`/discover/playlist?id=${item.id}`"
          :title="item.name"
        >
          {{item.name}}
        </router-link>
        <!-- TODO -->
        <span class="creator fs-12 f-thide c-p">by <router-link to="/user">{{item.creator.nickname}}</router-link></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import { PlayList } from '@/interfaces';

@Component
export default class SimiList extends Vue {
  @Prop({
    type: Number,
    required: true,
  }) public id!: number;

  public list: PlayList[] = [];

  public fetchSimiList(id: number) {
    return this.$u.get(`/simi/playlist?id=${id}`)
      .then((res) => {
        this.list = res.failMark ? [] : res.playlists;
      });
  }

  public mounted() {
    this.fetchSimiList(this.id);
  }

  @Watch('id')
  public onIdChnage(newId: number) {
    this.fetchSimiList(newId);
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/variables.less";

.simi-list {
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
    display: flex;
    margin-bottom: 15px;

    .cover {
      img {
        display: block;
      }
    } // .cover

    .text {
      margin-left: 10px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .name {
        max-width: 140px;
        display: block;
        .set-a(#000);
      } // .name

      .creator {
        color: #999;

        a {
          max-width: 106px;
          .set-a(#666);
        }
      } // .creator
    } // .text
  } // .item
} // .simi-list
</style>

