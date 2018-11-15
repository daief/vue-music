<template>
  <div class="recommend">
    <banner />
    <div style="height: 700px">
      <play-list-card />
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

