<template>
  <div class="volume">
    <span class="ibs c-p i-v" @click="handleClickVolume" />
    <transition name="transition-fade">
      <div class="ctrl-area" v-show="audioBar.isShowVolume">
        <div class="all">
          <div class="active" :style="ActiveStyle">
            <span class="ibs c-p drag-point" @mousedown="handleSliderMouseDown" />
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
import {Vue, Component, Watch} from 'vue-property-decorator';
import {State} from 'vuex-class';
import { ABAction, AudioBarState } from '@/stores/audioBar';

@Component
export default class Volume extends Vue {
  @State public audioBar!: AudioBarState;

  private startY: number = 0;
  private endY: number = 0;
  private allLength: number = 0;

  private isDragging: boolean = false;
  private dragY: number = 0;

  get ActiveVolume(): number {
    this.dragY = this.dragY < this.startY ? this.startY : (this.dragY > this.endY ? this.endY : this.dragY);
    return (this.endY - this.dragY) / this.allLength;
  }

  get ActiveStyle() {
    return {
      height: `${this.ActiveVolume * 100}%`,
    };
  }

  // 切换音量显示
  public handleClickVolume() {
    this.$store.dispatch(ABAction('toggleIsShowVolume'));
  }

  // 鼠标按下
  public handleSliderMouseDown() {
    this.isDragging = true;
  }

  // 鼠标移动
  public handleMouseMove(e: MouseEvent) {
    e.preventDefault();
    if (this.isDragging) {
      this.dragY = e.clientY;
      this.setPlayerVolume(this.ActiveVolume);
    }
  }

  // 鼠标抬起
  public handleMouseUp(e: MouseEvent) {
    if (this.isDragging) {
      this.dragY = e.clientY;
      // 改变音量
      this.setPlayerVolume(this.ActiveVolume);
    }
    this.isDragging = false;
  }

  public initParams() {
    const rect = (document.querySelector('.volume > .ctrl-area > .all') as HTMLDivElement).getBoundingClientRect();
    this.startY = rect.top;
    this.endY = rect.bottom;
    this.allLength = rect.height;

    this.dragY = this.endY - this.$u.local.getLocalVolume() * this.allLength;
  }

  public setPlayerVolume(volume: number) {
    this.audioBar.player.volume = volume;
    this.$u.local.setLocal(this.$u.local.KEYS.VOLUME, volume);
  }

  public mounted() {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
    this.initParams();
  }

  public beforeDestroy() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  @Watch('audioBar.isShowVolume')
  public onIsShowVolumeChange(val: boolean) {
    if (val) {
      this.$u.delay(() => {
        this.initParams();
      }, 0);
    }
  }
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>


