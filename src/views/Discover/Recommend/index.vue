<template>
  <div class="recommend">
    <banner />

    <div class="body">
      <div class="left">
        <recommend-panel />
        <album-card
          :id="73914415"
          src="http://p3.music.126.net/_ul8hOejiAJu3g2stTqJ4A==/109951163661990135.jpg?param=130y130"
          play-link="/discover/playlist/${item.id}"
          name="name"
          :artists="[{name: 'xxxx'}, {name: 'xxxx2'}]"
        />
      </div>
      <div class="right">
        right
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import AlbumCard from '@/components/AlbumCard/index.vue';
import Banner from './Banner.vue';
import RecommendPanel from './RecommendPanel.vue';

@Component({
  components: {
    Banner,
    AlbumCard,
    RecommendPanel,
  },
})
export default class Recommend extends Vue {

}
</script>

<style lang="less" scoped>
@import './style.less';
</style>

