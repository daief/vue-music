<template>
  <div class="view-song">
    <canvas width="520" height="260" ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import { State } from 'vuex-class';
import { AudioBarState } from '@/stores/audioBar';

@Component
export default class ViewSong extends Vue {
  @State public audioBar!: AudioBarState;

  @Prop({
    type: Boolean,
    required: true,
    default: false,
  }) public show!: boolean;

  private audioContext!: AudioContext;
  private analyser!: AnalyserNode;

  private canvasContext!: CanvasRenderingContext2D;
  private WIDTH: number = 0;
  private HEIGHT: number = 0;

  private isInited: boolean = false;

  public init() {
    if (!this.audioBar.player) {
      return false;
    }

    try {
      this.audioContext = new AudioContext();
    } catch (_) {
      return;
    }

    this.analyser = this.audioContext.createAnalyser();
    const audioSrc = this.audioContext.createMediaElementSource(this.audioBar.player);

    audioSrc.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    this.canvasContext = (this.$refs.canvas as HTMLCanvasElement).getContext('2d')!;
    this.WIDTH = this.canvasContext.canvas.width;
    this.HEIGHT = this.canvasContext.canvas.height;
    this.isInited = true;
    return true;
  }

  public startDraw() {
    if (!this.isInited) { return; }
    const {analyser, canvasContext, WIDTH, HEIGHT} = this;
    const dataArray = new Uint8Array(analyser.fftSize);
    const loop = () => {
      if (!this.show || !this.audioBar.isShowList) {
        // 不可见时停止可视化绘制
        return requestAnimationFrame(loop);
      }

      analyser.getByteTimeDomainData(dataArray);
      // analyser.getByteFrequencyData(dataArray)

      canvasContext.clearRect(0, 0, WIDTH, HEIGHT);
      canvasContext.strokeStyle = '#aaa';
      canvasContext.beginPath();

      const sliceWidth = WIDTH / analyser.fftSize;

      let x = 0;
      for (let i = 0; i < analyser.fftSize; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * HEIGHT / 2;
        if (i === 0) {
          canvasContext.moveTo(x, y);
        } else {
          canvasContext.lineTo(x, y);
        }
        x += sliceWidth;
      }
      canvasContext.lineTo(WIDTH, HEIGHT / 2);
      canvasContext.stroke();
      requestAnimationFrame(loop);
    };

    loop();
  }

  public mounted() {
    this.init();
    this.startDraw();
  }

  @Watch('audioBar.player')
  public onPlayerChange() {
    this.init();
    this.startDraw();
  }
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>

