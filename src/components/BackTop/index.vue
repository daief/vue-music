<template>
  <div class="back-top c-p" @click="handleClick">
    TOP
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class BackTop extends Vue {
  @Prop({
    default: () => window,
  }) public scrollEl!: HTMLElement;

  public handleClick() {
    if (this.scrollEl) {
      this.$u.controlScroll({
        el: this.scrollEl,
        duration: 350,
        y: 0,
      });
    }
  }
}
</script>

<style lang="less" scoped>
.back-top {
  box-sizing: border-box;
  position: fixed;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 10px;
  bottom: 160px;
  right: 155px;
  color: #333;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 3px;

  &:hover {
    background-color: #e5e5e5;
  }
}
</style>
