<template>
  <div id="app" @click="hideSomething">
    <div @click="hideSomething">
      <!-- <img src="./assets/logo.png"> -->
      <router-view></router-view>
    </div>
    

    <!-- 底部播放条 -->
    <AudioBar></AudioBar>
  </div>
</template>

<script>
import axios from 'axios'
import AudioBar from './components/AudioBar.vue'
export default {
  name: 'app',
  components: {
    'AudioBar': AudioBar
  },
  methods: {
    hideSomething() {
      this.$store.dispatch('setIsShowVolume', false)
    }
  },
  created () {
    axios.get('static/data/play_list.json').then((res) => {
      this.$store.dispatch('setPlayList', res.data.list)
      this.$store.dispatch('setMusic', res.data.list[0])
      this.$store.dispatch('setPlayIndex', 0)
      console.log(this.$store.getters.PlayList)
      // // data.user的信息赋值给info  再通过组件的数据传递传给sideBar
      // this.info = res.data.user
      // // 把所有的音乐数据给vuex的musicAllList
      // store.dispatch('set_MusicAllList', res.data.music)
      // // 所有的数据存起来  包括音乐个人信息 等等
      // store.dispatch('set_AllInfo', res.data)
      // // 设置音乐的地址  初始化 根据vuex的currentIndex来决定
      // this.$refs.audio.setAttribute('src', store.getters.getCurrentMusic.url)
      // // 给audio元素存在vuex 的state里面  方便日后调用
      // store.dispatch('set_AudioElement', this.$refs.audio)
    }, (err) => {
      console.log(err)
    })
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
