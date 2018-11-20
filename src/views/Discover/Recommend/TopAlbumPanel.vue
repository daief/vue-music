<template>
  <div class="top-album-panel">
    <u-title
      :icon="true"
      title="新碟上架"
      title-link="/discover/album"
      more-link="/discover/album"
    />

    <div style="border: 1px solid #d3d3d3;margin: 20px 0 37px;">  <!-- only for border -->
      <div class="wrap">
        <div class="cards">
          <div
            v-for="(lists, i) in albumCards"
            :key="i"
            class="row"
            :class="`r-${i + 1}`"
          >
            <album-card
              class="small"
              v-for="album in lists"
              :key="album.id"
              :id="album.id"
              :src="album.picUrl"
              :play-link="`/discover/album/${album.id}`"
              :name="album.name"
              :artists="album.artists"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * 新碟上架模块
 */
import { Vue, Component } from 'vue-property-decorator';
import UTitle from '@/components/UTitle/index.vue';
import AlbumCard from '@/components/AlbumCard/index.vue';
import { Album } from '@/interfaces';

@Component({
  components: {
    UTitle,
    AlbumCard,
  },
})
export default class TopAlbumPanel extends Vue {

  /**
   * 专辑列表
   */
  public albumList: Album[] = [
    {
      songs: [],
      paid: false,
      onSale: false,
      tags: '',
      status: 1,
      picUrl:
        'http://p1.music.126.net/TxhzgYXtdUfpltOgDl4WvQ==/109951163678525057.jpg',
      company: 'Genie Music',
      alias: [],
      briefDesc: '',
      commentThreadId: 'R_AL_3_74494400',
      publishTime: 1542643200007,
      picId: 109951163678525060,
      copyrightId: 690010,
      artist: {
        img1v1Id: 18686200114669624,
        topicPerson: 0,
        picUrl:
          'http://p1.music.126.net/HjYKgs6RBCLcvnfrT6PnRQ==/109951163678421943.jpg',
        trans: '박지헌',
        musicSize: 78,
        alias: [],
        briefDesc: '',
        albumSize: 19,
        picId: 109951163678421940,
        img1v1Url:
          'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
        name: '朴志宪',
        id: 124481,
        picId_str: '109951163678421943',
        transNames: ['박지헌'],
        img1v1Id_str: '18686200114669622',
      },
      artists: [
        {
          img1v1Id: 18686200114669624,
          topicPerson: 0,
          picUrl:
            'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          trans: '',
          musicSize: 0,
          alias: [],
          briefDesc: '',
          albumSize: 0,
          picId: 0,
          img1v1Url:
            'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
          name: '朴志宪',
          id: 124481,
          img1v1Id_str: '18686200114669622',
        },
      ],
      subType: '录音室版',
      description: '',
      blurPicUrl:
        'http://p1.music.126.net/TxhzgYXtdUfpltOgDl4WvQ==/109951163678525057.jpg',
      companyId: 0,
      pic: 109951163678525060,
      name: 'You Are My Life',
      id: 74494400,
      type: 'EP/Single',
      size: 3,
      picId_str: '109951163678525057',
    },
    {
      songs: [],
      paid: false,
      onSale: false,
      tags: '',
      status: 1,
      picUrl:
        'http://p1.music.126.net/NK4SmZVoUJEvN0GgFB6GEA==/109951163678042799.jpg',
      company: 'Luminant Entertainment',
      alias: [],
      briefDesc: '',
      commentThreadId: 'R_AL_3_74492079',
      publishTime: 1542643200007,
      picId: 109951163678042800,
      copyrightId: 728014,
      artist: {
        img1v1Id: 18686200114669624,
        topicPerson: 0,
        picUrl:
          'http://p1.music.126.net/US7jCBGTm-bosV8mxyTewQ==/109951163115281275.jpg',
        trans: '벨',
        musicSize: 88,
        alias: [],
        briefDesc: '',
        albumSize: 4,
        picId: 109951163115281280,
        img1v1Url:
          'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
        name: 'Belle',
        id: 12278050,
        picId_str: '109951163115281275',
        transNames: ['벨'],
        img1v1Id_str: '18686200114669622',
      },
      artists: [
        {
          img1v1Id: 18686200114669624,
          topicPerson: 0,
          picUrl:
            'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          trans: '',
          musicSize: 0,
          alias: [],
          briefDesc: '',
          albumSize: 0,
          picId: 0,
          img1v1Url:
            'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
          name: 'Belle',
          id: 12278050,
          img1v1Id_str: '18686200114669622',
        },
      ],
      subType: '录音室版',
      description: '',
      blurPicUrl:
        'http://p1.music.126.net/NK4SmZVoUJEvN0GgFB6GEA==/109951163678042799.jpg',
      companyId: 0,
      pic: 109951163678042800,
      name: 'I drink my blueberry ade at home.',
      id: 74492079,
      type: 'EP/Single',
      size: 3,
      picId_str: '109951163678042799',
    },
    {
      songs: [],
      paid: false,
      onSale: false,
      tags: '',
      status: 1,
      picUrl:
        'http://p1.music.126.net/L2NCJ3Zst76p4Re63Rnn2Q==/109951163678329989.jpg',
      company: 'Loen Entertainment',
      alias: [],
      briefDesc: '',
      commentThreadId: 'R_AL_3_74494086',
      publishTime: 1542643200007,
      picId: 109951163678329980,
      copyrightId: 1410822,
      artist: {
        img1v1Id: 18686200114669624,
        topicPerson: 0,
        picUrl:
          'http://p1.music.126.net/eI16HMLJrkMD9KZd40aRnw==/109951163537772555.jpg',
        trans: '하이라이트',
        musicSize: 33,
        alias: [],
        briefDesc: '',
        albumSize: 5,
        picId: 109951163537772560,
        img1v1Url:
          'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
        name: 'HIGHLIGHT',
        id: 12302153,
        picId_str: '109951163537772555',
        transNames: ['하이라이트'],
        img1v1Id_str: '18686200114669622',
      },
      artists: [
        {
          img1v1Id: 18686200114669624,
          topicPerson: 0,
          picUrl:
            'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          trans: '',
          musicSize: 0,
          alias: [],
          briefDesc: '',
          albumSize: 0,
          picId: 0,
          img1v1Url:
            'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
          name: 'HIGHLIGHT',
          id: 12302153,
          img1v1Id_str: '18686200114669622',
        },
      ],
      subType: '录音室版',
      description: '',
      blurPicUrl:
        'http://p1.music.126.net/L2NCJ3Zst76p4Re63Rnn2Q==/109951163678329989.jpg',
      companyId: 0,
      pic: 109951163678329980,
      name: 'OUTRO',
      id: 74494086,
      type: 'EP/Single',
      size: 6,
      picId_str: '109951163678329989',
    },
    {
      songs: [],
      paid: false,
      onSale: false,
      tags: '',
      status: 3,
      picUrl:
        'http://p1.music.126.net/HALD9SEqP9l0_yhpEDX9oQ==/109951163406219046.jpg',
      company: '简单快乐',
      alias: [],
      briefDesc: '',
      commentThreadId: 'R_AL_3_71723157',
      publishTime: 1531440000000,
      picId: 109951163406219040,
      copyrightId: 15001,
      artist: {
        img1v1Id: 18686200114669624,
        topicPerson: 0,
        picUrl:
          'http://p1.music.126.net/oDnzchyeFItOQ2XJS4Dz1Q==/109951163531788221.jpg',
        trans: '',
        musicSize: 7,
        alias: [],
        briefDesc: '',
        albumSize: 1,
        picId: 109951163531788220,
        img1v1Url:
          'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
        name: '王子异',
        id: 13058502,
        picId_str: '109951163531788221',
        img1v1Id_str: '18686200114669622',
      },
      artists: [
        {
          img1v1Id: 18686200114669624,
          topicPerson: 0,
          picUrl:
            'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          trans: '',
          musicSize: 0,
          alias: [],
          briefDesc: '',
          albumSize: 0,
          picId: 0,
          img1v1Url:
            'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
          name: '王子异',
          id: 13058502,
          img1v1Id_str: '18686200114669622',
        },
      ],
      subType: '录音室版',
      description: '',
      blurPicUrl:
        'http://p1.music.126.net/HALD9SEqP9l0_yhpEDX9oQ==/109951163406219046.jpg',
      companyId: 0,
      pic: 109951163406219040,
      name: 'AMH',
      id: 71723157,
      type: 'EP/Single',
      size: 1,
      picId_str: '109951163406219046',
    },
    {
      songs: [],
      paid: false,
      onSale: false,
      tags: '',
      status: 1,
      picUrl:
        'http://p1.music.126.net/p63_MHvz_f32ir4TncSVnA==/109951163678015480.jpg',
      company: 'Genie Music',
      alias: [],
      briefDesc: '',
      commentThreadId: 'R_AL_3_74269098',
      publishTime: 1542643200007,
      picId: 109951163678015490,
      copyrightId: 690010,
      artist: {
        img1v1Id: 18686200114669624,
        topicPerson: 0,
        picUrl:
          'http://p1.music.126.net/u3nFrXLE5fdVIjOyzE8ZpA==/109951163197521639.jpg',
        trans: '공일오비',
        musicSize: 193,
        alias: ['空一乌飞'],
        briefDesc: '',
        albumSize: 32,
        picId: 109951163197521630,
        img1v1Url:
          'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
        name: '015B',
        id: 128188,
        picId_str: '109951163197521639',
        transNames: ['공일오비'],
        img1v1Id_str: '18686200114669622',
      },
      artists: [
        {
          img1v1Id: 18686200114669624,
          topicPerson: 0,
          picUrl:
            'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          trans: '',
          musicSize: 0,
          alias: [],
          briefDesc: '',
          albumSize: 0,
          picId: 0,
          img1v1Url:
            'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
          name: '015B',
          id: 128188,
          img1v1Id_str: '18686200114669622',
        },
        {
          img1v1Id: 18686200114669624,
          topicPerson: 0,
          picUrl:
            'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          trans: '',
          musicSize: 0,
          alias: [],
          briefDesc: '',
          albumSize: 0,
          picId: 0,
          img1v1Url:
            'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
          name: 'Bigman',
          id: 30617482,
          img1v1Id_str: '18686200114669622',
        },
      ],
      subType: '录音室版',
      description: '',
      blurPicUrl:
        'http://p1.music.126.net/p63_MHvz_f32ir4TncSVnA==/109951163678015480.jpg',
      companyId: 0,
      pic: 109951163678015490,
      name: 'New Edition 06',
      id: 74269098,
      type: 'EP/Single',
      size: 2,
      picId_str: '109951163678015480',
    },
    {
      songs: [],
      paid: false,
      onSale: false,
      tags: '',
      status: 1,
      picUrl:
        'http://p1.music.126.net/6LIdvEgrtK_WS7BN0P-7mA==/109951163677967107.jpg',
      company: '海蝶音乐',
      alias: [],
      briefDesc: '',
      commentThreadId: 'R_AL_3_74481403',
      publishTime: 1542643200007,
      picId: 109951163677967100,
      copyrightId: 22036,
      artist: {
        img1v1Id: 18686200114669624,
        topicPerson: 0,
        picUrl:
          'http://p1.music.126.net/jMKFsWPG5lhDf-w008spVg==/109951163678069392.jpg',
        trans: '',
        musicSize: 72,
        alias: ['悟空'],
        briefDesc: '',
        albumSize: 23,
        picId: 109951163678069390,
        img1v1Url:
          'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
        name: '戴荃',
        id: 791534,
        picId_str: '109951163678069392',
        img1v1Id_str: '18686200114669622',
      },
      artists: [
        {
          img1v1Id: 18686200114669624,
          topicPerson: 0,
          picUrl:
            'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          trans: '',
          musicSize: 0,
          alias: [],
          briefDesc: '',
          albumSize: 0,
          picId: 0,
          img1v1Url:
            'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
          name: '戴荃',
          id: 791534,
          img1v1Id_str: '18686200114669622',
        },
      ],
      subType: '录音室版',
      description: '',
      blurPicUrl:
        'http://p1.music.126.net/6LIdvEgrtK_WS7BN0P-7mA==/109951163677967107.jpg',
      companyId: 0,
      pic: 109951163677967100,
      name: '不完荃',
      id: 74481403,
      type: '专辑',
      size: 12,
      picId_str: '109951163677967107',
    },
    {
      songs: [],
      paid: false,
      onSale: false,
      tags: '',
      status: -4,
      picUrl:
        'http://p1.music.126.net/n8objKMAfyw-cotbj9CmQw==/109951163676240009.jpg',
      company: '环球唱片',
      alias: [],
      briefDesc: '',
      commentThreadId: 'R_AL_3_74268947',
      publishTime: 1542556800007,
      picId: 109951163676240020,
      copyrightId: 7003,
      artist: {
        img1v1Id: 18686200114669624,
        topicPerson: 0,
        picUrl:
          'http://p1.music.126.net/nILBk4DaE3yV__25uq-5GQ==/18641120139241412.jpg',
        trans: '',
        musicSize: 1615,
        alias: ['Eason Chan'],
        briefDesc: '',
        albumSize: 101,
        picId: 18641120139241412,
        img1v1Url:
          'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
        name: '陈奕迅',
        id: 2116,
        picId_str: '18641120139241412',
        img1v1Id_str: '18686200114669622',
      },
      artists: [
        {
          img1v1Id: 18686200114669624,
          topicPerson: 0,
          picUrl:
            'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          trans: '',
          musicSize: 0,
          alias: [],
          briefDesc: '',
          albumSize: 0,
          picId: 0,
          img1v1Url:
            'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
          name: '陈奕迅',
          id: 2116,
          img1v1Id_str: '18686200114669622',
        },
        {
          img1v1Id: 18686200114669624,
          topicPerson: 0,
          picUrl:
            'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          trans: '',
          musicSize: 0,
          alias: [],
          briefDesc: '',
          albumSize: 0,
          picId: 0,
          img1v1Url:
            'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
          name: 'eason and the duo band',
          id: 14713083,
          img1v1Id_str: '18686200114669622',
        },
      ],
      subType: '录音室版',
      description: '',
      blurPicUrl:
        'http://p1.music.126.net/n8objKMAfyw-cotbj9CmQw==/109951163676240009.jpg',
      companyId: 0,
      pic: 109951163676240020,
      name: 'L.O.V.E.',
      id: 74268947,
      type: '专辑',
      size: 15,
      picId_str: '109951163676240009',
    },
    {
      songs: [],
      paid: false,
      onSale: false,
      tags: '',
      status: 1,
      picUrl:
        'http://p1.music.126.net/azyOBKxG1E56smj5qrdWpQ==/109951163678547758.jpg',
      company: '华宇世博音乐文化（北京）有限公司',
      alias: [],
      briefDesc: '',
      commentThreadId: 'R_AL_3_74482384',
      publishTime: 1542643200007,
      picId: 109951163678547760,
      copyrightId: 22036,
      artist: {
        img1v1Id: 18686200114669624,
        topicPerson: 0,
        picUrl:
          'http://p1.music.126.net/FcPbvx-33aL190aeVrtj2w==/5956054488081576.jpg',
        trans: '',
        musicSize: 68,
        alias: [],
        briefDesc: '',
        albumSize: 9,
        picId: 5956054488081576,
        img1v1Url:
          'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
        name: '王梵瑞',
        id: 5352,
        img1v1Id_str: '18686200114669622',
      },
      artists: [
        {
          img1v1Id: 18686200114669624,
          topicPerson: 0,
          picUrl:
            'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          trans: '',
          musicSize: 0,
          alias: [],
          briefDesc: '',
          albumSize: 0,
          picId: 0,
          img1v1Url:
            'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
          name: '王梵瑞',
          id: 5352,
          img1v1Id_str: '18686200114669622',
        },
      ],
      subType: '未知',
      description: '',
      blurPicUrl:
        'http://p1.music.126.net/azyOBKxG1E56smj5qrdWpQ==/109951163678547758.jpg',
      companyId: 0,
      pic: 109951163678547760,
      name: '小人国',
      id: 74482384,
      type: 'EP/Single',
      size: 1,
      picId_str: '109951163678547758',
    },
    {
      songs: [],
      paid: false,
      onSale: false,
      tags: '',
      status: 1,
      picUrl:
        'http://p1.music.126.net/7NsWTwHE2Fd-6R47pISg2Q==/109951163676814384.jpg',
      company: 'Loen Entertainment',
      alias: [],
      briefDesc: '',
      commentThreadId: 'R_AL_3_74479566',
      publishTime: 1542556800007,
      picId: 109951163676814380,
      copyrightId: 1410822,
      artist: {
        img1v1Id: 18686200114669624,
        topicPerson: 0,
        picUrl:
          'http://p1.music.126.net/1Yg4Cc3bsw3FTVN86QLTjQ==/109951163676855010.jpg',
        trans: '셀럽파이브',
        musicSize: 2,
        alias: [],
        briefDesc: '',
        albumSize: 2,
        picId: 109951163676855000,
        img1v1Url:
          'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
        name: 'Celeb Five',
        id: 13133016,
        picId_str: '109951163676855010',
        transNames: ['셀럽파이브'],
        img1v1Id_str: '18686200114669622',
      },
      artists: [
        {
          img1v1Id: 18686200114669624,
          topicPerson: 0,
          picUrl:
            'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          trans: '',
          musicSize: 0,
          alias: [],
          briefDesc: '',
          albumSize: 0,
          picId: 0,
          img1v1Url:
            'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
          name: 'Celeb Five',
          id: 13133016,
          img1v1Id_str: '18686200114669622',
        },
      ],
      subType: '录音室版',
      description: '',
      blurPicUrl:
        'http://p1.music.126.net/7NsWTwHE2Fd-6R47pISg2Q==/109951163676814384.jpg',
      companyId: 0,
      pic: 109951163676814380,
      name: '셔터 (Shutter)',
      id: 74479566,
      type: 'EP/Single',
      size: 1,
      picId_str: '109951163676814384',
    },
    {
      songs: [],
      paid: false,
      onSale: false,
      tags: '',
      status: 1,
      picUrl:
        'http://p1.music.126.net/PL9JQSRdi-gEEDyjqkuMvg==/109951163676772241.jpg',
      company: 'Genie Music',
      alias: [],
      briefDesc: '',
      commentThreadId: 'R_AL_3_74266081',
      publishTime: 1542556800007,
      picId: 109951163676772240,
      copyrightId: 690010,
      artist: {
        img1v1Id: 18686200114669624,
        topicPerson: 0,
        picUrl:
          'http://p1.music.126.net/N6u5reDLQ1FdK0LF-0UTuA==/109951163324013208.jpg',
        trans: '옥상달빛',
        musicSize: 65,
        alias: ['Dalmoon'],
        briefDesc: '',
        albumSize: 24,
        picId: 109951163324013220,
        img1v1Url:
          'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
        name: '屋顶月光',
        id: 128040,
        picId_str: '109951163324013208',
        transNames: ['옥상달빛'],
        img1v1Id_str: '18686200114669622',
      },
      artists: [
        {
          img1v1Id: 18686200114669624,
          topicPerson: 0,
          picUrl:
            'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          trans: '',
          musicSize: 0,
          alias: [],
          briefDesc: '',
          albumSize: 0,
          picId: 0,
          img1v1Url:
            'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
          name: '屋顶月光',
          id: 128040,
          img1v1Id_str: '18686200114669622',
        },
      ],
      subType: '录音室版',
      description: '',
      blurPicUrl:
        'http://p1.music.126.net/PL9JQSRdi-gEEDyjqkuMvg==/109951163676772241.jpg',
      companyId: 0,
      pic: 109951163676772240,
      name: '밤밤밤',
      id: 74266081,
      type: 'EP/Single',
      size: 1,
      picId_str: '109951163676772241',
      transNames: ['夜夜夜'],
    },
  ];

  public toggle: boolean = false;

  get albumCards() {
    const {albumList, toggle} = this;
    const startIdxs = toggle ? [5, 0, 5] : [0, 5, 0];

    return startIdxs.map((start) => albumList.slice(start, start + 5));
  }

  public mounted() {
    // this.$u.get('/top/album?offset=0&limit=10')
    //   .then((res) => {
    //     if (!res.failMark) {
    //       this.albumList = res.albums || this.albumList;
    //     }
    //   });
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/variables.less";

.top-album-panel {
  padding: 0 20px;

  .wrap {
    height: 184px;
    background: #f5f5f5;
    border: 1px solid #fff;

    .cards {
      width: 645px;
      height: 150px;
      overflow: hidden;
      position: relative;
      margin: 0 auto;
      margin-top: 28px;

      .row {
        width: 100%;
        display: flex;
        justify-content: space-around;

        &.r-1 {
          position: absolute;
          left: -100%;
        }

        &.r-2 {
          position: absolute;
          left: 0;
        }

        &.r-3 {
          position: absolute;
          left: 100%;
        }
      } // .row
    } // .cards
  } // .wrap
} // .top-album-panel
</style>


