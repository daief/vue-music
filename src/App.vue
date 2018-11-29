<template>
  <div id="app">
    <div
      class="content smoth-scroll"
      @click="handleClickCloseAllModal"
      @scroll="throttleScroll"
      ref="content"
    >
      <header-bar />
      <router-view />
      <bottom-footer />
    </div>
    <div class="bottom">
      <audio-bar id="audioBar" />
    </div>

    <transition name="transition-fade">
      <back-top :scroll-el="$refs.content" v-show="showBackTop" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AudioBar from '@/components/AudioBar/index.vue';
import HeaderBar from '@/components/HeaderBar/index.vue';
import BottomFooter from '@/components/BottomFooter/index.vue';
import BackTop from '@/components/BackTop/index.vue';
import { ABAction } from '@/stores/audioBar';
import throttle from 'lodash/throttle';

@Component({
  components: {
    AudioBar,
    HeaderBar,
    BottomFooter,
    BackTop,
  },
})
export default class App extends Vue {
  public showBackTop: boolean = false;

  public throttleScroll: any;

  constructor() {
    super();

    this.throttleScroll = throttle(this.handleScroll, 100);
  }

  public handleClickCloseAllModal() {
    this.$store.dispatch(ABAction('closeAllModal'));
  }

  public handleScroll(e: any) {
    if (e.target.scrollTop >= 300) {
      this.showBackTop = true;
    } else {
      this.showBackTop = false;
    }
  }
}
</script>

<style lang="less">
html, body { height: 100%; }
#app {
  // 'Avenir'
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: whitesmoke;
  color: #2c3e50;
  height: 100%;
  overflow: hidden;
  font-size: 12px;

  display: flex;
  flex-direction: column;

  & > .content {
    flex: 1;
    overflow-y: scroll;
    position: relative;
  }

  & > .bottom {
    position: relative;

    #audioBar {
      position: absolute;
      width: 100%;
      bottom: 0;
      z-index: 100;
    }
  }
}
</style>
