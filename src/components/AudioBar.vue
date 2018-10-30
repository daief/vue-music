<template>
  <div class="audio-bar" :class="{unlock}">
    <!-- 位置锁定 -->
    <div class="position-lock">
      <span class="ibs c-p ctr-lock" :class="{unlock}" @click="togglePositionLocked" />
    </div>

    <!-- content -->
    <div class="wrap">

    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Provide, Watch} from 'vue-property-decorator';

@Component
export default class AudioBar extends Vue {
  public unlock: boolean = false;

  public togglePositionLocked() {
    this.unlock = !this.unlock;
  }
}
</script>

<style lang="less" scoped>
  @import "~@/styles/variables.less";

  @img-playbar: "../assets/images/playbar.png";
  @bar-height: 53px;

  .audio-bar {
		height: @bar-height;
    position: relative;
    transition: all .7s;

    &.unlock {
      height: 7px;
    }

    &:hover {
      height: @bar-height;
      transition-duration: .4s;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 67px;
      z-index: -1;
      background-position: 0 5px;
      background: url(@img-playbar) repeat-x;
    }

    &::after {
      content: "";
      position: absolute;
      width: 15px;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: -1;
      background-position: 0 5px;
      background: url(@img-playbar) repeat-x;
    }

    .position-lock {
      position: absolute;
      top: -14px;
      right: 15px;
      width: 52px;
      height: 67px;
      background: url(@img-playbar) no-repeat 0 9999px;
      background-position: 0 -380px;

      .ctr-lock {
        background: url(@img-playbar) no-repeat 0 9999px;
        background-position: -100px -380px;
        width: 18px;
        height: 18px;
        margin-top: 6px;

        &:hover {
          background-position: -100px -400px;
        }

        &.unlock {
          background-position: -80px -380px;
        }

        &.unlock:hover {
          background-position: -80px -400px;
        }
      } // .ctr-lock
    } // .position-lock

    .wrap {
      width: @content-width;
      height: 47px;
      margin: 0 auto;
      margin-top: @bar-height - 47px;
      position: relative;
    } // .wrap
  } // .audio-bar
</style>

