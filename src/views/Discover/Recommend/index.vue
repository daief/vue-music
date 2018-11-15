<template>
  <div class="recommend">
    <banner />
    <div style="height: 700px">
      <play-list-card
        src="https://p2.music.126.net/vrOG0hAhslI4djtZdMgE6g==/6044015418094303.jpg"
        :count="1000"
        title="titletitletitletitletitletitletitletitle"
        :show-name="false"
        name="name"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import PlayListCard from '@/components/PlayListCard/index.vue';
import Banner from './Banner.vue';

@Component({
  components: {
    Banner,
    PlayListCard,
  },
})
export default class Recommend extends Vue {

}
</script>

<style lang="less" scoped>
@import './style.less';
</style>

