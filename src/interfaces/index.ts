/**
 * any key value pair
 */
export interface KVAny {
  [key: string]: any;
}

/**
 * number or string
 */
type nstr = number | string;

/**
 * 专辑类型
 */
export interface Album extends KVAny {
  id: nstr;
  name: string;
  picUrl: string;
  pic: number;
  pic_str?: string;
}

/**
 * 艺术家、歌手
 */
export interface Artist extends KVAny {
  id: nstr;
  name: string;
}

export interface Song extends KVAny {
  album: Album;
  alias: string[];
  artists: Artist[];
  duration: nstr;
  id: nstr;
  mvid: nstr;
  name: string;
  cd: nstr;
  position: nstr;
  source: {
    title: string;
    link: string;
    fid: nstr;
    fdata: nstr;
  } | null;
}

/**
 * http request result type
 */
export interface HttpRes extends KVAny {
  failMark?: boolean;
  httpError?: any;
}

/**
 * 歌词
 */
export interface Lyric extends KVAny {
  lrc: {
    version: nstr;
    lyric: string;
  };
  tlyric: {
    version: nstr;
    lyric: string;
  };
  transUser?: {
    demand?: nstr;
    id: nstr;
    nickname: string;
    status: number;
    uptime: number;
    userid: nstr;
  };
}

/**
 * 歌曲 url 接口结果
 */
export interface SongUrl extends KVAny {
  id?: nstr;
  url: string;
  br?: nstr;
  size?: number;
  md5?: string;
  code?: number;
  type?: string;
}

/**
 * delay 方法返回结果
 */
export interface DelayResult {
  readonly promise: Promise<any>;
  cancel: () => void;
}

/**
 * Banner
 */
export interface Banner extends KVAny {
  imageUrl: string;
  adid: null | nstr;
  targetId: nstr;
  // 10: album, 1004: mv, 1: song, 4001: activity, 3000: 跳 url
  targetType: number;
  titleColor: string;
  typeTitle: string;
  url: null | string;
  exclusive: boolean;
}

/**
 * 歌单列表 Item
 */
export interface PlayListItem {
  id: nstr;
  type: nstr;
  name: string;
  copywriter: string;
  picUrl: string;
  canDislike: boolean;
  playCount: number;
  trackCount: number;
  highQuality: boolean;
  alg: string;
}

/**
 * 歌单描述
 */
export interface PlayList extends KVAny {
  subscribers: User[];
  subscribed: boolean;
  creator: User;
  tracks: PlayListTrack[];
  trackIds: Array<{
    id: number;
    v: number;
  }>;
  description: string;
  playCount: number;
  trackCount: number;
  coverImgUrl: string;
  tags: string[];
  status: number;
  createTime: number;
  updateTime: number;
  commentThreadId: string;
  highQuality: boolean;
  privacy: number;
  newImported: boolean;
  specialType: number;
  trackUpdateTime: number;
  coverImgId: number;
  userId: number;
  ordered: boolean;
  cloudTrackCount: number;
  subscribedCount: number;
  adType: number;
  trackNumberUpdateTime: number;
  name: string;
  id: number;
  shareCount: number;
  coverImgId_str: string;
  commentCount: number;
}

/**
 * 歌单中的 track
 */
export interface PlayListTrack {
  name: string;
  id: number;
  pst: number;
  t: number;
  ar: Artist[];
  alia: string[];
  pop: number;
  st: number;
  rt: any;
  fee: number;
  v: number;
  crbt: any;
  cf: any;
  al: Album;
  dt: number;
  cd: string;
  no: number;
  rtUrl: any;
  ftype: number;
  rtUrls: any[];
  djId: number;
  copyright: number;
  s_id: number;
  rtype: number;
  rurl: number;
  mst: number;
  cp: number;
  mv: number;
  publishTime: number;
}

/**
 * XXX 初步猜测用户类型
 */
export interface User extends KVAny {
  defaultAvatar: boolean;
  province: number;
  authStatus: number;
  followed: boolean;
  avatarUrl: string;
  accountStatus: number;
  gender: number;
  city: number;
  birthday: number;
  userId: number;
  userType: number;
  nickname: string;
  signature: string;
  description: string;
  detailDescription: string;
  avatarImgId: number;
  backgroundImgId: number;
  backgroundUrl: string;
  authority: number;
  mutual: boolean;
  expertTags: any;
  experts: any;
  djStatus: number;
  vipType: number;
  remarkName: any;
  avatarImgIdStr: string;
  backgroundImgIdStr: string;
  avatarImgId_str: string;
}
