<template>
  <div class="recommend-panel">
    <u-title
      :icon="true"
      title="热门推荐"
      title-link="/discover/playlist"
      more-link="/discover/playlist"
    >
      <div class="tags" slot="center">
        <template v-for="(tag, i) in tags">
          <router-link
            :key="$u.generateKey(tag, i, 1)"
            :to="`discover/playlist/?cat=${tag}`"
            class="ibs c-p tag"
          >
            {{tag}}
          </router-link>
          <span
            v-if="i !== tags.length - 1"
            :key="$u.generateKey(tag, i, 2)"
            class="ibs line"
          >
            |
          </span>
        </template>
      </div>
    </u-title>
    <div class="cards">
      <play-list-card
        v-for="item in Max8Item"
        :key="item.id"
        class="card"
        :src="item.picUrl"
        :count="item.playCount"
        :play-link="`/discover/playlist/${item.id}`"
        :title="item.name"
        :show-name="false"
      />
    </div>
  </div>
</template>

<script lang="ts">
/**
 * 每日推荐模块
 */
import { Vue, Component } from 'vue-property-decorator';
import UTitle from '@/components/UTitle/index.vue';
import PlayListCard from '@/components/PlayListCard/index.vue';
import { PlayListItem } from '@/interfaces';

@Component({
  components: {
    UTitle,
    PlayListCard,
  },
})
export default class RecommendPanel extends Vue {
  public tags = [
    '华语',
    '流行',
    '摇滚',
    '民谣',
    '电子',
  ];

  public cardList: PlayListItem[] = [
    {
      id: 2505474523,
      type: 0,
      name: '表面很多人喜欢，其实孤独的连猫都没有',
      copywriter: '编辑推荐：以前喜欢一个人，现在喜欢一个人',
      picUrl:
        'http://p2.music.126.net/HjMMOvLo3D5ytITWvVD2ag==/109951163657843103.jpg',
      canDislike: false,
      playCount: 1776384.2,
      trackCount: 77,
      highQuality: false,
      alg: 'featured',
    },
    {
      id: 2289763322,
      type: 0,
      name: '石头计划第二季 正在发声',
      copywriter: '编辑推荐：网易云音乐石头计划第二季强势回归！',
      picUrl:
        'http://p2.music.126.net/LzeT3fjN4xfd5GRvA6RpnA==/109951163662095293.jpg',
      canDislike: false,
      playCount: 596633.75,
      trackCount: 107,
      highQuality: false,
      alg: 'featured',
    },
    {
      id: 2252293216,
      type: 0,
      name: '十年林宥嘉：爱你这回事，整整十年',
      copywriter: '根据你喜欢的单曲《心酸》推荐',
      picUrl:
        'http://p2.music.126.net/vgq-e6CVHF5AI3PQOP_coA==/109951163329357851.jpg',
      canDislike: true,
      playCount: 6828921.5,
      trackCount: 30,
      highQuality: false,
      alg: 'searchBased_withRank',
    },
    {
      id: 114133130,
      type: 0,
      name: '回忆童年经典影视剧歌曲',
      copywriter: '根据你喜欢的单曲《历史的天空》推荐',
      picUrl:
        'http://p2.music.126.net/YftzBnjMf_jNHoSMYC0qsg==/3409585558129221.jpg',
      canDislike: true,
      playCount: 7779539,
      trackCount: 155,
      highQuality: false,
      alg: 'searchBased_withRank',
    },
    {
      id: 83432070,
      type: 0,
      name: '小时候看的那些电视剧歌曲',
      copywriter: '根据你喜欢的单曲《历史的天空》推荐',
      picUrl:
        'http://p2.music.126.net/L947nOYtWD53tmgUuFfftQ==/18654314278491213.jpg',
      canDislike: true,
      playCount: 1792326.4,
      trackCount: 407,
      highQuality: false,
      alg: 'searchBased_withRank',
    },
    {
      id: 620809527,
      type: 0,
      name: '初识不知曲中意，再听已是曲中人',
      copywriter: '根据你喜欢的单曲《姑娘（Cover：王北车）》推荐',
      picUrl:
        'http://p2.music.126.net/cicbk5VpIUQ6hkQdMZ1MoQ==/18670806953975568.jpg',
      canDislike: true,
      playCount: 2869398,
      trackCount: 295,
      highQuality: false,
      alg: 'searchBased_withRank',
    },
    {
      id: 2068333856,
      type: 0,
      name: '让你难过的是感情还是生活？（自渡丶余生）',
      copywriter: '根据你喜欢的单曲《姑娘（Cover：王北车）》推荐',
      picUrl:
        'http://p2.music.126.net/S721WGPkcWVOgJcOOn_3Ow==/109951163638905859.jpg',
      canDislike: true,
      playCount: 6785903.5,
      trackCount: 268,
      highQuality: false,
      alg: 'searchBased_withRank',
    },
    {
      id: 819632624,
      type: 0,
      name: '一个摩羯座的听歌列表',
      copywriter: '根据你喜欢的单曲《最后我们没在一起》推荐',
      picUrl:
        'http://p2.music.126.net/DYK-tzfYmCMf8Uvv183srA==/19200771556442990.jpg',
      canDislike: true,
      playCount: 685613.2,
      trackCount: 967,
      highQuality: false,
      alg: 'searchBased_withRank',
    },
  ];

  get Max8Item() {
    return Array.from({length: 8}).map((_, i) => this.cardList[i]).filter((c) => !!c);
  }

  public mounted() {
    // this.$u.get('')
    //   .then(res => {
    //     if (res.failMark) {
    //       this.cardList = res.result || this.cardList
    //     }
    //   })
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/variables.less";

.recommend-panel {
  padding: 20px;

  .tags {
    height: 33px;
    line-height: 33px;
    margin-left: 14px;

    .tag {
      .set-a(#666);
    }
    .line {
      color: #ccc;
      margin: 0 12px;
    }
  } // .tags

  .cards {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;

    & > .card {
      width: 140px;
      margin-right: calc(~"((100% - 140px * 4) / 3) - 1px");
      margin-bottom: 50px;

      &:nth-of-type(4n) {
        margin-right: 0;
      }
    }
  }
} // .u-title
</style>


