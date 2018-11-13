<template>
  <div id="app">
    <div class="content smoth-scroll" @click="handleClickCloseAllModal">
      <!-- write header here <div class="header"></div> -->
      <header-bar />
      <router-view/>
    </div>
    <div class="bottom">
      <audio-bar id="audioBar" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AudioBar from '@/components/AudioBar/index.vue';
import HeaderBar from '@/components/HeaderBar/index.vue';
import { ABAction } from '@/stores/audioBar';

@Component({
  components: {
    AudioBar,
    HeaderBar,
  },
})
export default class App extends Vue {
  public handleClickCloseAllModal() {
    this.$store.dispatch(ABAction('closeAllModal'));
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
  color: #2c3e50;
  height: 100%;
  overflow: hidden;
  font-size: 12px;

  display: flex;
  flex-direction: column;

  & > .content {
    flex: 1;
    overflow-y: scroll;
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
