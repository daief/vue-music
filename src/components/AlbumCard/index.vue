<template>
  <div class="album-card ibs">
    <div class="wrap">
      <img :src="src" class="ibs" alt="">
      <router-link :to="playLink" class="mask" />
      <span class="ibs c-p play" @click="handleClickPlay" />
    </div>

    <p class="title fs-14">
      <router-link
        :to="playLink"
        class="c-p-line f-thide ellipsis"
        :title="name"
      >
        {{name}}
      </router-link>
    </p>
    <p class="creators f-thide ellipsis">
      <template v-for="(artist, i) in artists">
        <router-link
          to="/x"
          class="name f-thide"
          :title="artist.name"
          :key="$u.generateKey(i, 1)"
        >
          {{artist.name}}
        </router-link>
        <span v-if="i !== artists.length - 1" :key="$u.generateKey(i, 2)"> / </span>
      </template>
    </p>
  </div>
</template>

<script lang="ts">
/**
 * 常规展示专辑的 item
 */
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Artist } from '@/interfaces';
import { ABAction } from '@/stores/audioBar';

@Component
export default class AlbumCard extends Vue {
  @Prop({
    type: Number,
    required: true,
  }) public id!: number;

  @Prop({
    type: String,
    required: true,
  }) public src!: string;

  @Prop({
    type: String,
    required: true,
  }) public playLink!: string;

  @Prop({
    type: String,
    required: true,
  }) public name!: string;

  @Prop({
    type: Array,
    required: true,
  }) public artists!: Artist[];

  /**
   * 点击专辑歌单
   */
  public handleClickPlay() {
    // 拉取专辑并播放第一首
    this.$store.dispatch(ABAction('startPlayNewList'), {
      id: this.id,
      type: 'ALBUM',
    });
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/variables.less';

.album-card {
  width: 153px;

  .wrap {
    width: 100%;
    height: 130px;
    position: relative;

    img {
      width: auto;
      height: 100%;
    }

    .mask {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: url('~@/assets/images/coverall.png') no-repeat;
      background-position: 0 -845px;
    } // .mask

    .play {
      display: none;
      position: absolute;
      right: 32px;
      bottom: 10px;
      width: 16px;
      height: 17px;
      background: url('~@/assets/images/iconall.png') no-repeat;
      background-position: 0 0;

      &:hover {
        background-position: 0 -60px;
      }
    }

    &:hover .play {
      display: block;
    }
  } // .wrap

  .ellipsis {
    max-width: 100%;
  }

  .title {
    margin: 0;
    margin-top: 7px;

    a {
      .set-a(#000);
      display: inline-block;
    }
  }

  .creators {
    color: #666;
    margin: 0;
    height: 14px;
    line-height: 14px;

    a.name {
      .set-a(#666);
      display: inline-block;
      vertical-align: text-bottom;
    }
  } // .wrap

  // small size
  &.small {
    width: 118px;

    .wrap {
      height: 100px;

      .mask {
        background-position: 0 -570px;
      } // .mask
    } // .wrap
  } // .album-card.small
} // .album-card
</style>

