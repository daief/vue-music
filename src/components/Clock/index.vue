<template>
  <a
    href="https://paulrhayes.com/an-analogue-clock-using-only-css/"
    target="_Blank"
    title="By Paul Hayes"
    class="clock"
  >
    <div class="wrap" ref="wrap">
      <img src="@/assets/images/hourHand.png" :style="getStyle('H')">
      <img src="@/assets/images/minuteHand.png" :style="getStyle('M')">
      <img src="@/assets/images/secondHand.png" :style="getStyle('S')">
    </div>
  </a>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Clock extends Vue {
  public hour: number = 0;
  public minute: number = 0;
  public second: number = 0;

  public getAngle(type: 'H' | 'M' | 'S') {
    switch (type) {
      case 'H': return 30 * this.hour + this.minute / 60 * 30;
      case 'M': return this.minute * 6 + this.second / 60 * 6;
      case 'S':
      default: return this.second * 6;
    }
  }

  public getStyle(type: 'H' | 'M' | 'S') {
    return {
      transform: `rotate(${this.getAngle(type)}deg)`,
    };
  }

  public mounted() {
    const date = new Date();
    this.hour = date.getHours() % 12;
    this.minute = date.getMinutes();
    this.second = date.getSeconds();

    this.$u.delay(() => {
      const wrapDiv = this.$refs.wrap as HTMLDivElement;
      if (wrapDiv) {
        (wrapDiv.children[0] as HTMLImageElement).style.transform = `rotate(${360 + this.getAngle('H')}deg)`;
        (wrapDiv.children[1] as HTMLImageElement).style.transform = `rotate(${4320 + this.getAngle('M')}deg)`;
        (wrapDiv.children[2] as HTMLImageElement).style.transform = `rotate(${259200 + this.getAngle('S')}deg)`;
      }
    }, 66);
  }
}
</script>

<style lang="less" scoped>
.clock {
  .wrap {
    position: relative;
    width: 200px;
    height: 200px;
    background-image: url('~@/assets/images/clockFace200x200.png');
    background-size: 100% 100%;
    /*left: 50%;*/
    margin: 1em auto;

    img {
      position: absolute;
      width: 200px;
      height: 200px;
      transition: transform 43200s linear;
    }
  }
}
</style>
