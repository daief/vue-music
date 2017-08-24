<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>

    <!-- 底部播放条 -->
    <AudioBar></AudioBar>
  </div>
</template>

<script>
import AudioBar from './components/AudioBar.vue'
export default {
  name: 'app',
  components: {
    'AudioBar': AudioBar
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0; 
    box-sizing:border-box;
  }
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
