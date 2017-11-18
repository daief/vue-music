<template>
    <div id="app" @click.self="hideSomething">
        <!-- 顶部菜单条 -->
        <HeaderBar style="min-width:1280px;"></HeaderBar>
        <div @click="hideSomething" style="margin-bottom: 55px;min-width:1280px;">
            <transition name="switch" mode="out-in">
                <router-view name="app"></router-view>
            </transition>
        </div>
        <!-- 底部播放条 -->
        <AudioBar style="min-width:1280px;"></AudioBar>
        <!--  -->
        <div class="back-top" :style="backTopStyle" @click="backToTop"></div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
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
            },
            ...mapGetters([
                'IsPlaying',
                'Music'
            ])
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
                // use window.scrollTo to top
                window.scrollTo(0, 0)
            }
        },
        mounted() {
            window.addEventListener('scroll', this.appScroll)
            console.log(this.MUrl)
        },
        created() {
            let date = new Date()
            // 读取local storage
            this.$store.dispatch('setLocal_data', JSON.parse(window.localStorage.getItem("VUE_MUSIC")))

            // 热门推荐页面
            this.$axios.get(this.MUrl + 'personalized').then((res) => {
                this.$store.dispatch('setHotList', res.data.result)
            },(err) => {
                console.log(err)
            })

            // 个性推荐（网友精选碟）
            this.$axios.get(this.MUrl + 'top/playlist?limit=3&order=hot').then((res) => {
                this.$store.dispatch('setPersonalList', res.data.playlists.map((list) => {
                    return {
                        "name": list.name,
                        "id": list.id,
                        "coverImgUrl": list.coverImgUrl,
                        "description": list.description,
                        "playCount": list.playCount
                    }
                }))
            },(err) => {
                console.log(err)
            })

            // 拉取榜单，加载榜单的时候可能会ERR_CONTENT_LENGTH_MISMATCH
            // 不通过/top/list?idx=6的方式获取榜单，与普通歌单的获取方式相同
            this.$axios.all([
                this.$axios.get(this.MUrl + 'playlist/detail?id=3779629'),
                this.$axios.get(this.MUrl + 'playlist/detail?id=2884035'),
                this.$axios.get(this.MUrl + 'playlist/detail?id=19723756')
            ]).then(this.$axios.spread((idx0, idx2, idx3) => {
                let rspArry = [idx0.data.playlist, idx2.data.playlist, idx3.data.playlist]
                this.$store.dispatch('setBList', rspArry.map((rsp) => {
                    return {
                        "id": rsp.id,
                        "name": rsp.name,
                        "img": rsp.coverImgUrl,
                        "playCount": rsp.playCount,
                        "description": rsp.description,
                        "tracks": rsp.tracks.map((v) => {
                            return {
                                "id": v.id,
                                "name": v.name,
                                "singers": v.ar.map((singer) => {
                                    return singer.name
                                }),
                                "album": v.al.name,
                                "img": v.al.picUrl,
                                "duration": v.dt              
                            }
                        })
                    }
                }))
            })).catch((error) => {
                console.log('抓取榜单失败', error)
            })
            

            // 加载默认播放列表
            this.$axios.get('static/data/play_list.json').then((res2) => {
                let list = this.$store.getters.Local_data.playList
                // 存在本地缓存
                if (list.length > 0) {
                    this.$store.dispatch('setPlayList', list) 
                    this.$store.dispatch('setPlayIndex', this.$store.getters.Local_data.playIndex)
                } else {
                    this.$store.dispatch('setPlayList', res2.data.list) 
                    this.$store.dispatch('setPlayIndex', 0)
                }
                this.$store.dispatch('setMusicFormPlayList', this.$store.getters.PlayIndex)
            },(err) => {
                console.log(err)
            })
        },
        beforeCreate () {
        	if (window.location.protocol == 'https:') {
        		if (confirm("需要在http下查看效果（http://daief.coding.me/vue-music/）")) {
        			window.location.href = "http://daief.coding.me/vue-music/"
        		}
        	}
        },
        watch: {
            IsPlaying(nv, ov) {
                // 如果正在播放歌曲，将歌曲名作为页面title
                if (nv) {
                    document.title = this.Music.name;
                } else {
                    document.title = 'vue-music';
                }
            },
            Music: {
                handler(newvalue, oldvalue) {
                    if (this.IsPlaying) {
                        document.title = newvalue.name;
                    } else {
                        document.title = 'vue-music';
                    }
                },
                deep: true
            }
        }
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
