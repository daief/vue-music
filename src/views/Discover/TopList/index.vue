<template>
  <div class="top-list main-content">

    <!-- left -->
    <div class="left">
      <img src="~@/assets/images/1.gif" class="gif">
    </div>

    <!-- right -->
    <div class="right">
    </div>
  </div>
</template>

<script lang="ts">
/**
 * 发现页/排行榜
 */
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class extends Vue {

}
</script>

<style lang="less" scoped>
@import '~@/styles/variables.less';

.top-list {
  background-color: #fff;
  display: flex;
  flex-wrap: nowrap;
  position: relative;

  &::after {
    .vertical-1-line(#d3d3d3);
    left: @right-width;
  }

  .left {
    width: @right-width;
    background-color: #f9f9f9;

    .gif {
      width: 100%;
      display: block;
    }
  } // .left

  .right {
    width: @left-width;
  } // .left
} // .top-list
</style>
