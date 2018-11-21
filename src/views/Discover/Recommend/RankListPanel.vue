<template>
  <div class="rank-list-panel">
    <u-title
      :icon="true"
      title="榜单"
      title-link="/discover/top"
      more-link="/discover/top"
    />

    <div class="ranks">
      <rank-list class="rank" v-for="type in TopTypes" :key="type" :top-type="type" />
    </div>
  </div>
</template>

<script lang="ts">
/**
 * 榜单模块
 */
import {Vue, Component} from 'vue-property-decorator';
import RankList from '@/components/RankList/index.vue';
import UTitle from '@/components/UTitle/index.vue';


@Component({
  components: {
    RankList,
    UTitle,
  },
})
export default class RankListPanel extends Vue {
  get TopTypes() {
    const types: string[] = Array.from({length: 24}).map((_, i) => `${i}`);
    const l = types.length;
    const rds: number[] = [];
    while (true) {
      const rd1 = Math.floor(Math.random() * l);
      if (!rds.includes(rd1)) {
        rds.push(rd1);
      }
      if (rds.length === 3) {
        break;
      }
    }
    return rds.map((i) => types[i]);
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/variables.less';
.rank-list-panel {
  padding: 20px;

  .ranks {
    margin-top: 20px;
    display: flex;
    outline: 1px #e0e0e0 solid;

    .rank {
      flex: 1;
      position: relative;

      &::after {
        .vertical-1-line(#e0e0e0);
        right: 0;
        top: 0;
      }

      &:last-of-type::after {
        display: none;
      }
    }
  }
}
</style>

