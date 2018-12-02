<template>
  <div class="song main-content">

    <!-- left -->
    <div class="left">
      <song-info />
    </div>

    <!-- right -->
    <div class="right">
      song-{{$route.query.id}}
      rigth
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SongInfo from './SongInfo.vue';

@Component({
  components: {
    SongInfo,
  },
})
export default class Song extends Vue {}
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
  } // .left
} // .song
</style>
