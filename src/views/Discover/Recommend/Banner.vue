<template>
  <div class="banner" :style="WholeBgStyle">
    <div class="wrap">
      <ul class="list">
        <li
          class="item"
          v-for="(item, i) in bannerList" :key="item.targetId"
          :class="{active: i === activeIdx}"
        >
          <img :src="item.imageUrl" crossorigin="anonymous">
        </li>
      </ul>

      <!-- dots -->
      <div class="dots">
        <span
          class="ibs c-p dot"
          v-for="(item, i) in bannerList" :key="item.targetId"
          :class="{active: i === activeIdx}"
          @click="handleClickDot(i)"
        />
      </div>

      <span class="ibs c-p switch pre" @click="handleClickSwitch(false)" />
      <span class="ibs c-p switch next" @click="handleClickSwitch(true)" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Banner } from '@/interfaces';

@Component
export default class Recommend extends Vue {

  get WholeBgStyle() {
    const {activeIdx, themeColors} = this;
    return {
      'background-color': themeColors[activeIdx] || '#fff',
    };
  }
  public activeIdx: number = -1;

  public bannerList: Banner[] = [
    {
      imageUrl:
        'http://p1.music.126.net/KsxGZcp3RDxXK0-PKy4UFA==/109951163655106514.jpg',
      targetId: 74263822,
      adid: null,
      targetType: 10,
      titleColor: 'red',
      typeTitle: 'VIP专享',
      url: null,
      exclusive: false,
      monitorImpress: null,
      monitorClick: null,
      monitorType: null,
      monitorImpressList: null,
      monitorClickList: null,
      monitorBlackList: null,
      extMonitor: null,
      extMonitorInfo: null,
      adSource: null,
      adLocation: null,
      encodeId: '74263822',
      program: null,
      event: null,
      video: null,
      song: null,
    },
    {
      imageUrl:
        'http://p1.music.126.net/zfGab21nSgFxy2fGjR5fKA==/109951163665039709.jpg',
      targetId: 10834179,
      adid: null,
      targetType: 1004,
      titleColor: 'red',
      typeTitle: '独家',
      url: null,
      exclusive: false,
      monitorImpress: null,
      monitorClick: null,
      monitorType: null,
      monitorImpressList: null,
      monitorClickList: null,
      monitorBlackList: null,
      extMonitor: null,
      extMonitorInfo: null,
      adSource: null,
      adLocation: null,
      encodeId: '10834179',
      program: null,
      event: null,
      video: null,
      song: null,
    },
    {
      imageUrl:
        'http://p1.music.126.net/REKWoySb6GORItIdt3Dypg==/109951163665046046.jpg',
      targetId: 74267804,
      adid: null,
      targetType: 10,
      titleColor: 'red',
      typeTitle: 'VIP专享',
      url: null,
      exclusive: false,
      monitorImpress: null,
      monitorClick: null,
      monitorType: null,
      monitorImpressList: null,
      monitorClickList: null,
      monitorBlackList: null,
      extMonitor: null,
      extMonitorInfo: null,
      adSource: null,
      adLocation: null,
      encodeId: '74267804',
      program: null,
      event: null,
      video: null,
      song: null,
    },
    {
      imageUrl:
        'http://p1.music.126.net/4J5mc65UJ7QsyvoR8NaB0w==/109951163662855875.jpg',
      targetId: 1323303551,
      adid: null,
      targetType: 1,
      titleColor: 'red',
      typeTitle: '独家',
      url: null,
      exclusive: false,
      monitorImpress: null,
      monitorClick: null,
      monitorType: null,
      monitorImpressList: null,
      monitorClickList: null,
      monitorBlackList: null,
      extMonitor: null,
      extMonitorInfo: null,
      adSource: null,
      adLocation: null,
      encodeId: '1323303551',
      program: null,
      event: null,
      video: null,
      song: null,
    },
    {
      imageUrl:
        'http://p1.music.126.net/Ss6LpMTbFV6npKsLwKM8rQ==/109951163665044628.jpg',
      targetId: 1323304668,
      adid: null,
      targetType: 1,
      titleColor: 'red',
      typeTitle: '独家',
      url: null,
      exclusive: false,
      monitorImpress: null,
      monitorClick: null,
      monitorType: null,
      monitorImpressList: null,
      monitorClickList: null,
      monitorBlackList: null,
      extMonitor: null,
      extMonitorInfo: null,
      adSource: null,
      adLocation: null,
      encodeId: '1323304668',
      program: null,
      event: null,
      video: null,
      song: null,
    },
    {
      imageUrl:
        'http://p1.music.126.net/_ZNa8n49S_aX6jx3lZ9KDA==/109951163665777399.jpg',
      targetId: 73496717,
      adid: null,
      targetType: 10,
      titleColor: 'red',
      typeTitle: 'VIP专享',
      url: null,
      exclusive: false,
      monitorImpress: null,
      monitorClick: null,
      monitorType: null,
      monitorImpressList: null,
      monitorClickList: null,
      monitorBlackList: null,
      extMonitor: null,
      extMonitorInfo: null,
      adSource: null,
      adLocation: null,
      encodeId: '73496717',
      program: null,
      event: null,
      video: null,
      song: null,
    },
    {
      imageUrl:
        'http://p1.music.126.net/hD4DgBwv8he2OFdoosFIVA==/109951163663181378.jpg',
      targetId: 74266817,
      adid: null,
      targetType: 10,
      titleColor: 'red',
      typeTitle: '独家',
      url: null,
      exclusive: false,
      monitorImpress: null,
      monitorClick: null,
      monitorType: null,
      monitorImpressList: null,
      monitorClickList: null,
      monitorBlackList: null,
      extMonitor: null,
      extMonitorInfo: null,
      adSource: null,
      adLocation: null,
      encodeId: '74266817',
      program: null,
      event: null,
      video: null,
      song: null,
    },
    {
      imageUrl:
        'http://p1.music.126.net/qeOqTqVL0mgsZkBPuxhamQ==/109951163663961858.jpg',
      targetId: 0,
      adid: null,
      targetType: 3000,
      titleColor: 'blue',
      typeTitle: '商城',
      url: 'https://music.163.com/m/at/5bea7ebd2b29924f66f607af',
      exclusive: false,
      monitorImpress: null,
      monitorClick: null,
      monitorType: null,
      monitorImpressList: null,
      monitorClickList: null,
      monitorBlackList: null,
      extMonitor: null,
      extMonitorInfo: null,
      adSource: null,
      adLocation: null,
      encodeId: '0',
      program: null,
      event: null,
      video: null,
      song: null,
    },
  ];

  private themeColors: string[] = [];

  private timer: number = 0;

  /**
   * 获取 banner 的色调
   */
  public async setThemeColors(list: Banner[]) {
    const getColor = (url: string): Promise<string> => {
      return new Promise((resolve) => {
        // 使用小图取色
        (window as any).RGBaster.colors(`${url}?param=365y168`, {
          exclude: [ 'rgb(255,255,255)', 'rgb(0,0,0)' ],
          success: (payload: any) => {
            // payload.dominant 是主色，RGB形式表示
            // payload.secondary 是次色，RGB形式表示
            // payload.palette 是调色板，含多个主要颜色，数组
            const {secondary} = payload;
            resolve(secondary || '#fff');
          },
        });
      });
    };

    for (let index = 0; index < list.length; index++) {
      const rs = await getColor(list[index].imageUrl).catch(() => '#fff');
      this.themeColors[index] = rs;
    }
  }

  /**
   * 点击第几个 banner
   */
  public handleClickDot(index: number) {
    this.activeIdx = index;
    this.startTimer();
  }

  /**
   * 切换 banner 上下
   */
  public handleClickSwitch(next: boolean) {
    const {activeIdx, bannerList} = this;
    this.activeIdx = (activeIdx + (next ? 1 : -1) + bannerList.length) % bannerList.length;
    this.startTimer();
  }

  /**
   * 计时轮播
   */
  public startTimer() {
    window.clearInterval(this.timer);
    this.timer = window.setInterval(() => {
      this.activeIdx = (this.activeIdx + 1) % this.bannerList.length;
    }, 2700);
  }

  public beforeMount() {
    this.$u.get('/banner').then((res) => {
      if (!res.failMark) {
        this.bannerList = res.banners;
      }
      this.activeIdx = 0;
      // get theme colors
      this.setThemeColors(this.bannerList);
      this.startTimer();
    });
  }

  public beforeDestroy() {
    window.clearInterval(this.timer);
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/variables.less";

.banner {
  @h: 336px;

  height: @h;
  transition: all .3s;

  .wrap {
    width: @content-width;
    height: 100%;
    margin: 0 auto;
    display: flex;
    position: relative;

    .list {
      list-style: none;
      margin: 0;
      padding: 0;
      height: @h;
      width: 730px;
      position: relative;


      .item {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transition: all .3s;

        img {
          display: block;
          width: 100%;
          height: 100%;
        }

        &.active {
          opacity: 1;
        }
      } // .item
    } // .list

    .dots {
      position: absolute;
      height: 20px;
      bottom: 0;
      left: 0;
      width: 730px;
      text-align: center;

      .dot {
        width: 20px;
        height: 20px;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          width: 40%;
          height: 40%;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
          border-radius: 50%;
          background-color: #fff;
          box-shadow: 0px 1px 2px 0px #ccc;
        }

        &.active::after {
          background-color: @main-red;
          box-shadow: 0px 1px 2px 0px red;
        }
      }
    } // .dots

    .switch {
      position: absolute;

      &.pre, &.next {
        width: 37px;
        height: 63px;
        top: 50%;
        transform: translateY(-50%);

        &:hover {
          background-color: rgba(0, 0, 0, 0.3);
        }

        &::before {
          content: "";
          position: absolute;
          width: 20px;
          height: 20px;
          top: 20px;
        }
      }

      &.pre {
        left: -68px;
        &::before {
          left: 12px;
          border-top: 2px solid #ffffff;
          border-left: 2px solid #ffffff;
          transform: rotate(-45deg);

        }
      }

      &.next {
        right: -68px;
        &::before {
          left: 3px;
          border-top: 2px solid #ffffff;
          border-right: 2px solid #ffffff;
          transform: rotate(45deg);
        }
      }
    } // .switch
  } // .wrap
}
</style>

