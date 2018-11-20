<template>
  <div class="recommend">
    <banner />

    <div class="body">
      <div class="left">
        <recommend-panel />
        <top-album-panel />
      </div>
      <div class="right">
        right
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import AlbumCard from '@/components/AlbumCard/index.vue';
import Banner from './Banner.vue';
import RecommendPanel from './RecommendPanel.vue';
import TopAlbumPanel from './TopAlbumPanel.vue';

@Component({
  components: {
    Banner,
    AlbumCard,
    RecommendPanel,
    TopAlbumPanel,
  },
})
export default class Recommend extends Vue {

}
</script>

<style lang="less" scoped>
@import './style.less';
</style>

