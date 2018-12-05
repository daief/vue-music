<template>
  <div class="tops">

  </div>
</template>

<script lang="ts">
/**
 * 发现页/排行榜，榜单种类
 */
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
  get Id(): string {
    return this.$route.query.Id;
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/variables.less';

.tops {

} // .tops
</style>