<template>
  <div class="list">
    <!-- list head -->
    <div class="head row">
      <div class="r-left">
        <h1 class="fs-14">播放列表(111)</h1>
        <span class="ibs c-p-line i-clear">清除</span>
      </div>
      <div class="r-right">
        <h1 class="fs-14 f-thide">歌曲名称</h1>
        <span class="ibs c-p i-close" />
      </div>
    </div>
    <!-- list body -->
    <div class="body row">
      <img class="bg-msk" src="https://music.163.com/api/img/blur/3300733912593978" >
      <div class="r-left smoth-scroll">
        <ul class="songs">
          <li
            class="song c-p"
            :class="{playing: item.id === 1}"
            v-for="item in fakeList"
            :key="item.id"
          >
            <!-- song name -->
            <div class="song-name f-thide">{{ item.song }}</div>
            <!-- operations -->
            <div class="icons">
              <div class="i-wrap">
                <span class="ibs c-p ic delete" />
                <span class="ibs c-p ic download" />
              </div>
            </div>
            <!-- singers -->
            <div class="singers f-thide">
              <template v-for="(singer, i2) in item.singers">
                <span class="singer c-p-line" :key="$u.generateKey(item.id, i2)">{{singer}}</span>
                <span class="singer" :key="$u.generateKey(item.id, i2, i2)">{{i2 !== item.singers.length - 1 ? '/' : null}}</span>
              </template>
            </div>
            <!-- duration -->
            <div class="duration">
              {{$u.formatSecond(item.duration)}}
            </div>
          </li>
        </ul>
      </div>
      <div class="r-right smoth-scroll">
        <div class="lyric">
          <p class="line active" v-for="(line, i) in lyricArr" :key="i">
            {{line.content}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class List extends Vue {

  get lyricArr() {
    return this.fakelyric.split(/[\n\r]/).map((str) => {
      const res = /^\[(\d+:\d+\.?\d+)\](.*)/.exec(str.trim());
      return res ? {
        formatTime: res[1],
        millisecond: this.$u.format2millisecond(res[1]),
        content: res[2],
      } : null;
    }).filter((v) => v);
  }

  public fakelyric = '[00:06.59]呼んでいる 胸のどこか奥で\n[00:12.06]いつも心踊る 夢を見たい\n[00:18.09]かなしみは 数えきれないけれど\n[00:23.87]その向こうできっと あなたに会える\n[00:29.40]\n[00:31.81]繰り返すあやまちの そのたび ひとは\n[00:38.20]ただ青い空の 青さを知る\n[00:43.33]果てしなく 道は続いて見えるけれど\n[00:50.92]この両手は 光を抱ける\n[00:54.89]\n[00:57.26]さよならのときの 静かな胸\n[01:02.80]ゼロになるからだが 耳をすませる\n[01:08.60]生きている不思議 死んでいく不思議\n[01:14.53]花も風も街も みんなおなじ\n[01:20.50]\n[01:22.40]nananan lalala lululu\n[01:47.63]呼んでいる 胸のどこか奥で\n[01:53.56]いつも何度でも 夢を描こう\n[01:59.14]かなしみの数を 言い尽くすより\n[02:05.16]同じくちびるで そっとうたおう\n[02:11.48]\n[02:12.96]閉じていく思い出の そのなかにいつも\n[02:19.31]忘れたくない ささやきを聞く\n[02:24.47]こなごなに砕かれた 鏡の上にも\n[02:31.12]新しい景色が 映される\n[02:35.89]\n[02:38.27]はじまりの朝の静かな窓\n[02:43.72]ゼロになるからだ 充たされてゆけ\n[02:49.70]海の彼方には もう探さない\n[02:55.66]輝くものは いつもここに\n[03:01.66]わたしのなかに 見つけられたから\n[03:08.20]\n[03:14.13]nananan lalala lululu\n';

  public fakeList = [
    {
      id: 1,
      song: 'name',
      singers: [
        'a', 'b',
      ],
      duration: 158,
    },
    {
      id: 2,
      song: 'name',
      singers: [
        'a', 'b',
      ],
      duration: 158,
    },
    {
      id: 3,
      song: 'name',
      singers: [
        'a', 'b',
      ],
      duration: 158,
    },
    {
      id: 4,
      song: 'name',
      singers: [
        'a', 'b',
      ],
      duration: 158,
    },
    {
      id: 5,
      song: 'name',
      singers: [
        'a', 'b',
      ],
      duration: 3601,
    },
    {
      id: 6,
      song: 'name',
      singers: [
        'a', 'b',
      ],
      duration: 3599,
    },
    {
      id: 7,
      song: 'name',
      singers: [
        'a', 'b',
      ],
      duration: 3600,
    },
    {
      id: 8,
      song: 'name',
      singers: [
        'a', 'b',
      ],
      duration: 121,
    },
    {
      id: 9,
      song: 'name',
      singers: [
        'a', 'b',
      ],
      duration: 119,
    },
    {
      id: 10,
      song: 'name',
      singers: [
        'a', 'b',
      ],
      duration: 120,
    },
  ];

  constructor(p: any) {
    super(p);
    console.log(this.lyricArr);
  }
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>

