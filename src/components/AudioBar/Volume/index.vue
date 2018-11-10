<template>
  <div class="volume">
    <span class="ibs c-p i-v" @click="handleClickVolume" />
    <transition name="transition-fade">
      <div class="ctrl-area" v-show="audioBar.isShowVolume">
        <div class="all">
          <div class="active">
            <span class="ibs c-p drag-point" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
/**
 * 播放条上的音量调节
 */
import {Vue, Component} from 'vue-property-decorator';
import {State} from 'vuex-class';
import { ABAction, AudioBarState } from '@/stores/audioBar';

@Component
export default class Volume extends Vue {
  @State public audioBar!: AudioBarState;

  // 切换音量显示
  public handleClickVolume() {
    this.$store.dispatch(ABAction('toggleIsShowVolume'));
  }
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>


