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
      <div class="r-right">

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class List extends Vue {
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
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>

