<template>
  <div id="app" @click.self="hideSomething">
    <!-- 顶部菜单条 -->
    <HeaderBar></HeaderBar>
    <div @click="hideSomething" style="margin-bottom: 55px;">
        <transition name="switch" mode="out-in">
          <router-view name="app"></router-view>
        </transition>
    </div>
    <!-- 底部播放条 -->
    <AudioBar></AudioBar>
    <!--  -->
    <div class="back-top" :style="backTopStyle" @click="backToTop"></div>
  </div>
</template>

<script>
import axios from 'axios'
import AudioBar from './components/AudioBar.vue'
import HeaderBar from './components/HeaderBar.vue'
export default {
  name: 'app',
  data () {
    return {
      // 页面滚动的距离
      windowPageYOffset: window.pageYOffset
    }
  },
  computed: { 
    backTopStyle () {
      return {
        'opacity': this.windowPageYOffset > 170? 1: 0
      }
    }
  },
  components: {
    'HeaderBar': HeaderBar,
    'AudioBar': AudioBar
  },
  methods: {
    hideSomething() {
      this.$store.dispatch('setIsShowVolume', false)
      this.$store.dispatch('setIsShowList', false)
    },
    appScroll () {
      this.windowPageYOffset = window.pageYOffset
    },
    backToTop () {
      document.body.scrollTop  = 0
    }
  },
  mounted () {
    window.addEventListener('scroll', this.appScroll)
  },
  created () {
    // 播放列表
    axios.get('static/data/play_list.json').then((res) => {
      // 获取本地列表，如果存在
      this.$store.dispatch('setPlayList', (JSON.parse(localStorage.getItem('VUE_MUSIC')) && JSON.parse(localStorage.getItem('VUE_MUSIC')).playList) || res.data.list)
      // 获取本地值，如果存在
      this.$store.dispatch('setPlayIndex', (JSON.parse(localStorage.getItem('VUE_MUSIC')) && JSON.parse(localStorage.getItem('VUE_MUSIC')).playIndex) || 0)
      this.$store.dispatch('setMusic', this.$store.getters.PlayList[this.$store.getters.PlayIndex])
    }, (err) => {
      console.log(err)
    })

    // 推荐页面
    axios.get('static/data/recommend.json').then((res) => {
      this.$store.dispatch('setHotList', res.data.hot)
      this.$store.dispatch('setPersonalList', res.data.personal)
      this.$store.dispatch('setBList', res.data.bList)
      // console.log(this.$store.getters.BList)
    }, (err) => {
      console.log(err)
    })

    // 加载all_music.json
    axios.get('static/data/all_music.json').then((res) => {
      this.$store.dispatch('setAllSongs', res.data.songs)
      this.$store.dispatch('gainSongById', 459717294)
      console.log(this.$store.getters.SongById)
    }, (err) => {
      console.log(err)
    })
  },
  watch: {
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0; 
    box-sizing:border-box;
    user-select: text; 
  }
  .back-top {
    position: fixed;
    z-index: 100;
    right: 100px;
    bottom: 150px;
    width: 49px;
    height: 44px;
    background: url(http://s2.music.126.net/style/web2/img/sprite.png?a30c23da103f33c2b2e7d44eb6d862d5) no-repeat 0 9999px;
    background-position: -265px -47px;
    cursor: pointer;
    transition: opacity .4s;
  }
  .back-top:hover {
    background-position: -325px -47px;
  }
  .switch-enter-active, .switch-leave-active {
    transition: opacity .3s;
  }
  .switch-enter, .switch-leave-active {
    opacity: 0;
  }
</style>
