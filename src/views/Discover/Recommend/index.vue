<template>
  <div class="recommend">
    <banner />

    <div class="body">
      <div class="left">
        <recommend-panel />
      </div>
      <div class="right">
        right
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import PlayListCard from '@/components/PlayListCard/index.vue';
import Banner from './Banner.vue';
import RecommendPanel from './RecommendPanel.vue';

@Component({
  components: {
    Banner,
    PlayListCard,
    RecommendPanel,
  },
})
export default class Recommend extends Vue {

}
</script>

<style lang="less" scoped>
@import './style.less';
</style>

