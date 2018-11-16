<template>
  <div class="play-list-card ibs">
    <div class="wrap">
      <img :src="src" alt="">
      <router-link :to="playLink" class="mask" />
      <div class="bar">
        <span class="ibs ic listen" />
        <span class="ibs count">{{CountStr}}</span>
        <!-- TODO -->
        <span class="ibs c-p ic play" title="播放" @click="handleClickPlay" />
      </div>
    </div>

    <p class="title fs-14">
      <router-link
        :to="playLink"
        class="c-p-line"
        :class="{
          'text-wrap': !showName,
          'f-thide ellipsis': showName
        }"
        :title="title"
      >
        {{title}}
      </router-link>
    </p>
    <p v-if="showName" class="creator">
      by
      <router-link to="/" class="name f-thide" :title="name">{{name}}</router-link>
    </p>
  </div>
</template>

<script lang="ts">
/**
 * 常规展示歌单的 item
 */
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ABAction } from '@/stores/audioBar';

@Component
export default class PlayListCard extends Vue {
  @Prop({
    type: Number,
    required: true,
  }) public id!: number;

  @Prop({
    type: String,
    required: true,
  }) public src!: string;

  @Prop({
    type: Number,
    required: true,
  }) public count!: number;

  @Prop({
    type: String,
    required: true,
  }) public playLink!: string;

  @Prop({
    type: String,
    required: true,
  }) public title!: string;

  @Prop({
    type: Boolean,
    default: false,
  }) public showName!: boolean;

  @Prop({
    type: String,
    default: '',
  }) public name!: string;

  get CountStr() {
    const count = Math.floor(this.count);
    return count >= 10000 ? `${Math.floor(count / 10000)}万` : count;
  }

  /**
   * 点击播放歌单
   */
  public handleClickPlay() {
    // 拉取歌单并播放第一首
    this.$store.dispatch(ABAction('startPlayNewList'), {id: this.id});
  }
}
</script>

<style scoped lang="less">
@import '~@/styles/variables.less';

.play-list-card {
  width: 140px;

  .wrap {
    width: 100%;
    height: 140px;
    position: relative;

    .mask {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: url('~@/assets/images/coverall.png') no-repeat 0 0;

    }

    img {
      width: 100%;
      height: 100%;
      display: block;
    }

    .bar {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 27px;
      z-index: 2;
      background: url('~@/assets/images/coverall.png') no-repeat 0 -537px;

      span.ibs, a.ibs {
        color: #ccc;
        float: left;

        &.ic {
          background: url('~@/assets/images/iconall.png') no-repeat;

          &.listen {
            width: 14px;
            height: 11px;
            margin: 9px 5px 9px 10px;
            background-position: 0 -24px;
          }

          &.play {
            float: right;
            width: 16px;
            height: 17px;
            margin: 5px 10px;
            background-position: 0 0;

            &:hover {
              background-position: 0 -60px;
            }
          }
        }

        &.count {
          margin-top: 8px;
        }
      }
    } // .bar
  } // .wrap

  .title {
    margin: 8px 0 3px;
    a {
      .set-a(#000);
      display: inline-block;

      &.ellipsis {
        max-width: 100%;
      }

      &.text-wrap {
        width: 100%;
        word-break: break-all;
        line-height: 20px;
      }
    }
  } // .title

  .creator {
    color: #999;
    margin: 0;
    height: 14px;
    line-height: 14px;

    a.name {
      .set-a(#666);
      display: inline-block;
      vertical-align: text-bottom;
      max-width: 105px;
    }
  } // .creator
} // .play-list-card
</style>
