<template>
  <div class="u-title">
    <span v-if="icon" class="ibs icon" />
    <!-- title -->
    <router-link v-if="titleLink" to="titleLink" class="ibs title c-p">{{title}}</router-link>
    <span v-else class="ibs title">{{title}}</span>

    <div class="center"><slot name="center"></slot></div>

    <div class="right">
      <slot name="right">
        <router-link v-if="moreLink" to="moreLink" class="ibs c-p more">更多 👉</router-link>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * 一个通用小 title
 */
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class UTitle extends Vue {
  @Prop({
    type: Boolean,
    default: false,
  }) public icon!: boolean;

  @Prop({
    type: String,
    required: true,
  }) public title!: boolean;

  @Prop({
    type: String,
    default: '',
  }) public titleLink!: boolean;

  @Prop({
    type: String,
    default: '',
  }) public moreLink!: boolean;
}
</script>

<style lang="less" scoped>
@import '~@/styles/variables.less';

.u-title {
  height: 33px;
  // line-height: 35px;
  border-bottom: 2px solid #C10D0C;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;

  .icon {
    width: 16px;
    height: 16px;
    position: relative;
    background-color: @main-red;
    border-radius: 50%;
    margin-left: 12px;
    margin-right: 12px;

    &::after {
      content: "";
      position: absolute;
      width: 50%;
      height: 50%;
      top: 25%;
      left: 25%;
      border-radius: 50%;
      background-color: #fff;
    }
  } // .icon

  .title {
    font-size: 20px;
  } // .title

  a.title {
    .set-a(#333);
    .rm-hover-underline();
  }

  .center {
    height: 100%;
    position: relative;
  }

  .right {
    height: 100%;
    line-height: 33px;
    position: absolute;
    right: 0;
    .more {
      .set-a(#666);
      margin-right: 3px;
    }
  }
} // .u-title
</style>


