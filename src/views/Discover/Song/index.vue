<template>
  <div class="song main-content">

    <!-- left -->
    <div class="left">
      <song-info :id="ID" />
    </div>

    <!-- right -->
    <div class="right">
      <img class="gif0" src="@/assets/images/0.gif" />

      <simi-list :id="ID" class="block" />

      <simi-songs :id="ID" class="block" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SongInfo from './SongInfo.vue';
import SimiList from './SimiList.vue';
import SimiSongs from './SimiSongs.vue';

@Component({
  components: {
    SongInfo,
    SimiList,
    SimiSongs,
  },
})
export default class Song extends Vue {
  get ID(): number {
    return +this.$route.query.id;
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/variables.less';

.song {
  background-color: #fff;
  display: flex;
  flex-wrap: nowrap;
  position: relative;

  &::after {
    .vertical-1-line(#d3d3d3);
    left: @left-width;
  }

  .left {
    width: @left-width;
  } // .left

  .right {
    width: @right-width;
    padding: 30px 0 40px;

    .gif0 {
      display: block;
      width: 100%;
    } // .gif0

    .block {
      margin: 0 20px;
      margin-bottom: 40px;
    }
  } // .left
} // .song
</style>
