<template>
  <div class="recommend">
    <banner />
    <div style="height: 700px">

    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Banner from './Banner.vue';

@Component({
  components: {
    Banner,
  },
})
export default class Recommend extends Vue {

}
</script>

<style lang="less" scoped>
@import './style.less';
</style>

