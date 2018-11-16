<template>
  <div class="recommend-panel">
    <u-title
      :icon="true"
      title="热门推荐"
      title-link="/discover/playlist"
      more-link="/discover/playlist"
    >
    </u-title>
  </div>
</template>

<script lang="ts">
/**
 * 每日推荐模块
 */
import {Vue, Component} from 'vue-property-decorator';
import UTitle from '@/components/UTitle/index.vue';

@Component({
  components: {
    UTitle,
  },
})
export default class RecommendPanel extends Vue {

}
</script>

<style lang="less" scoped>
@import '~@/styles/variables.less';

.recommend-panel {

} // .u-title
</style>


