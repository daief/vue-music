<template>
  <div class="song-info">
    <div class="left">
      <div class="cover-wrap">
        <!-- TODO -->
        <img class="cover" src="http://p1.music.126.net/aLCDRJNFcAIKBLISFkRpcQ==/2538772348713977.jpg?param=130y130" >
        <span class="ibs mask" />
      </div>

      <div class="out">
        <!-- TODO -->
        🎵<router-link to="/outchain">生成外链播放器</router-link>
      </div>
    </div>

    <div class="right">
      right
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SongInfo extends Vue {}
</script>

<style lang="less" scoped>
@import '~@/styles/variables.less';

.song-info {
  display: flex;
  padding: 40px 30px 40px 39px;

  .left {
    .cover-wrap {
      @size: 205px;

      width: @size;
      height: @size;
      line-height: @size;
      text-align: center;
      position: relative;

      .cover {
        width: 130px;
        height: 130px;
        display: inline-block;
        vertical-align: middle;
      }

      .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: @size;
        height: @size;
        background: url("~@/assets/images/coverall.png") no-repeat;
        background-position: -140px -580px;
      }
    } // .cover-wrap

    .out {
      margin-top: 20px;
      text-align: center;
      color: #0c73c2;

      a {
        .set-a(#0c73c2, #0c73c2, #0c73c2, underline);
      }
    }
  } // .left

  .right {
    width: 414px;
    margin-left: 25px;

  } // .right
} // .song-info
</style>
