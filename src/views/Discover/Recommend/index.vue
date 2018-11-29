<template>
  <div class="recommend">
    <banner />

    <div class="body main-content">
      <div class="left">
        <recommend-panel />
        <top-album-panel />
        <rank-list-panel />
      </div>
      <div class="right">
        <clock />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import AlbumCard from '@/components/AlbumCard/index.vue';
import Clock from '@/components/Clock/index.vue';
import Banner from './Banner.vue';
import RecommendPanel from './RecommendPanel.vue';
import TopAlbumPanel from './TopAlbumPanel.vue';
import RankListPanel from './RankListPanel.vue';

@Component({
  components: {
    Banner,
    AlbumCard,
    RecommendPanel,
    TopAlbumPanel,
    RankListPanel,
    Clock,
  },
})
export default class Recommend extends Vue {

}
</script>

<style lang="less" scoped>
@import './style.less';
</style>

