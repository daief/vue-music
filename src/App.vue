<template>
  <div id="app" @click.self="hideSomething" ref="app">
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
    <div class="back-top" :show="backTopIsShown" @click="backToTop"></div>
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
      test: 0
    }
  },
  computed: { 
    backTopIsShown () {
      console.log(this.test)
      return this.test > 100
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
      this.test = window.pageYOffset
    },
    backToTop () {
      document.body.scrollTop  = 0
    }
  },
  ready () {
    window.addEventListener('scroll', this.appScroll);
  },
  created () {
    // 播放列表
    axios.get('static/data/play_list.json').then((res) => {
      this.$store.dispatch('setPlayList', res.data.list)
      this.$store.dispatch('setPlayIndex', JSON.parse(localStorage.getItem('VUE_MUSIC')).playIndex || 0)
      this.$store.dispatch('setMusic', res.data.list[this.$store.getters.PlayIndex])
    }, (err) => {
      console.log(err)
    })
    // 推荐页面
    axios.get('static/data/recommend.json').then((res) => {
      this.$store.dispatch('setHotList', res.data.hot)
      this.$store.dispatch('setPersonalList', res.data.personal)
      console.log(this.$store.getters.HotList)
    }, (err) => {
      console.log(err)
    })
  },
  watch: {
    test (n, o) {
      console.log(222)
    }
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
    bottom: 200px;
    width: 49px;
    height: 44px;
    background: url(http://s2.music.126.net/style/web2/img/sprite.png?a30c23da103f33c2b2e7d44eb6d862d5) no-repeat 0 9999px;
    background-position: -265px -47px;
    cursor: pointer;
  }
  .back-top {
    background-position: -325px -47px;
  }
  .switch-enter-active, .switch-leave-active {
    transition: opacity .3s;
  }
  .switch-enter, .switch-leave-active {
    opacity: 0;
  }
</style>
