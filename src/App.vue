<template>
  <div id="app">
    <div class="content">
      <!-- write header here <div class="header"></div> -->
      <router-view/>
    </div>
    <audio-bar />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AudioBar from '@/components/AudioBar.vue';

@Component({
  components: {
    AudioBar,
  },
})
export default class App extends Vue {
}
</script>

<style lang="less">
html, body { height: 100%; }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  overflow-y: hidden;

  display: flex;
  flex-direction: column;

  & > .content {
    flex: 1;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
