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
        data() {
            return {
                // 页面滚动的距离
                windowPageYOffset: window.pageYOffset
            }
        },
        computed: {
            backTopStyle() {
                return {
                    'opacity': this.windowPageYOffset > 170 ? 1 : 0,
                    'height': this.windowPageYOffset > 170 ? '44px': 0,
                    'width': this.windowPageYOffset > 170 ? '49px': 0
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
            appScroll() {
                this.windowPageYOffset = window.pageYOffset
            },
            backToTop() {
                document.body.scrollTop = 0
            }
        },
        mounted() {
            // console.log(window.screen.width() + 'asd')
            if (document.body.clientWidth < 1279) {
                document.getElementById('app').style.display = 'none'
                alert('推荐使用分辨率1280以上的设备\n我不会告诉你我只是隐藏了div\nヾ(｡｀Д´｡)ﾉ彡') 
                console.log('推荐使用分辨率1280以上的设备\n我不会告诉你我只是隐藏了div\nヾ(｡｀Д´｡)ﾉ彡')
            }
            window.addEventListener('scroll', this.appScroll)
        },
        created() {
            // 读取local storage
            this.$store.dispatch('setLocal_data', JSON.parse(window.localStorage.getItem("VUE_MUSIC")))

            // 推荐页面
            axios.get('static/data/recommend.json').then((res) => {
                this.$store.dispatch('setHotList', res.data.hot) 
                this.$store.dispatch('setPersonalList', res.data.personal) 
                this.$store.dispatch('setBList', res.data.bList)
                // console.log(this.$store.getters.BList)
            },(err) => {
                console.log(err)
            })

            // 加载all_music.json
            axios.get('static/data/all_music.json').then((res) => {
                this.$store.dispatch('setAllSongs', res.data.songs)
                // this.$store.dispatch('gainSongById', 459717294)
                console.log('所有歌曲：' + res.data.songs.length)

                // 加载完所有歌曲后再加载播放列表
                axios.get('static/data/play_list.json').then((res2) => {
                    let ids = this.$store.getters.Local_data.playList
                    // 存在本地缓存
                    if (ids.length > 0) {
                        this.$store.dispatch('setPlayListWithIds', ids) 
                        this.$store.dispatch('setPlayIndex', this.$store.getters.Local_data.playIndex)
                    } else {
                        this.$store.dispatch('setPlayListWithIds', res2.data.ids) 
                        this.$store.dispatch('setPlayIndex', 0)
                    }
                    this.$store.dispatch('setMusic', this.$store.getters.PlayList[this.$store.getters.PlayIndex])
                },(err) => {
                    console.log(err)
                })
            },(err) => {
                console.log(err)
            })
        },
        watch: {}
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        user-select: text;
    }
    #app {
        width: 100%;
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
        transition: opacity,height .4s;
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
