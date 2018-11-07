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
    title: string
    link: string
    fid: nstr
    fdata: nstr,
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
    version: nstr
    lyric: string,
  };
  tlyric: {
    version: nstr
    lyric: string,
  };
  transUser?: {
    demand?: nstr
    id: nstr
    nickname: string
    status: number
    uptime: number
    userid: nstr,
  };
}
