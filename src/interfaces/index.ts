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
