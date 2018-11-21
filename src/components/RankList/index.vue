<template>
  <div class="rank-list">
    <div class="top">
      <router-link :to="Link" class="ibs mask">
        <img class="ibs c-p cover" :src="getListProp('coverImgUrl', '')" >
      </router-link>
      <div class="right">
        <router-link
          :to="Link"
          class="ibs fs-14 name f-thide"
          :title="getListProp('name', '')"
        >
          {{getListProp('name', '')}}
        </router-link>
        <div class="icons">
          <span class="ibs c-p icon play" title="播放全部" />
          <span class="ibs c-p icon collect" title="收藏" />
        </div>
      </div>
    </div>

    <div class="list">
      <div
        class="item"
        v-for="(item, i) in Tracks"
        :key="item.id"
        :class="{
          dark: i % 2 === 0,
          top3: i <= 2
        }"
      >
        <span class="ibs rank fs-16">{{i + 1}}</span>
        <!-- TODO -->
        <router-link
          :to="`/song?id=${item.id}`"
          class="ibs name f-thide"
          :title="item.name"
        >
          {{item.name}}
        </router-link>
        <div class="ops">
          <span class="ibs c-p icon play" title="播放" />
          <span class="ibs c-p icon add" title="添加" />
          <span class="ibs c-p icon collect" title="收藏" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * 首页展示十首歌曲的列表
 */
import {Vue, Component, Prop} from 'vue-property-decorator';
import { PlayList, PlayListTrack } from '@/interfaces';

@Component
export default class RankList extends Vue {
  @Prop({
    type: String,
    required: true,
    // https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%E6%8E%92%E8%A1%8C%E6%A6%9C
    default: '3',
  }) public topType!: string;

  public playList: PlayList | null = null;

  get Tracks(): PlayListTrack[] {
    const arr: PlayListTrack[] = this.getListProp('tracks', []);
    return arr.length > 10 ? arr.slice(0, 10) : arr;
  }

  get Link() {
    return `/discover/toplist?id=${this.getListProp('id', '')}`;
  }

  public getListProp(prop: string, d: any) {
    return this.$u.getProp(this.playList, prop, d);
  }

  public mounted() {
    this.$u.get(`/top/list?idx=${this.topType}`)
      .then((res) => {
        this.playList = res.failMark ? null : res.playlist;
      });
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/variables.less";
@import './style.less';
</style>

