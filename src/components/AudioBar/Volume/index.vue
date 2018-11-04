<template>
  <div class="volume">
    <span class="ibs c-p i-v" />
    <div class="ctrl-area">
      <div class="all">
        <div class="active">
          <span class="ibs c-p drag-point" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * 播放条上的音量调节
 */
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class Volume extends Vue {

}
</script>

<style lang="less" scoped>
@import './style.less';
</style>


