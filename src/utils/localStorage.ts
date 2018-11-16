import { Song } from '@/interfaces';

enum K {
  VOLUME = 'VOLUME',
  LOOP_TYPE = 'LOOP_TYPE',
  SONG_LIST = 'SONG_LIST',
  UN_LOCK = 'UN_LOCK',
  PLAY_LIST = 'PLAY_LIST',
  // 当前播放歌曲
  PLAY_SONG = 'PLAY_SONG',
}

class Dataer {
  public VER = '1.0';

  public KEYS = K;

  public setLocal(key: K, data: any) {
    window.localStorage.setItem(this.localKey(key), JSON.stringify(data));
  }

  public getLocal(key: K) {
    return this.tryParse(window.localStorage.getItem(this.localKey(key)) || '');
  }

  public tryParse(str: string) {
    try {
      const d = JSON.parse(str);
      return d;
    } catch (_) {
      return str;
    }
  }

  /**
   * 获取本地存储的音量值
   */
  public getLocalVolume() {
    const rs = this.getLocal(this.KEYS.VOLUME);
    return /^0\.\d+$/.test(rs) ? +rs : 0.75;
  }

  /**
   * 获取本地存储的播放模式
   */
  public getLocalLoopType() {
    const rs = this.getLocal(this.KEYS.LOOP_TYPE);
    const types = ['order', 'random', 'one'];
    return types.indexOf(rs) > -1 ? rs : types[0];
  }

  /**
   * 获取本地存储的 unlock 状态
   */
  public getLocalUnLockStatus() {
    const rs = this.getLocal(this.KEYS.UN_LOCK);
    return rs === true ? true : false;
  }

  /**
   * 获取本地存储的歌单列表
   */
  public getLocalPlayList() {
    const rs = this.getLocal(this.KEYS.PLAY_LIST);
    return rs instanceof Array ? rs : [];
  }

  /**
   * 获取本地存储的正在播放歌曲
   */
  public getLocalPlaySong() {
    const rs: Song = this.getLocal(this.KEYS.PLAY_SONG);
    return rs ? rs : null;
  }

  private localKey(key: string) {
    return `${key}-${this.VER}`;
  }
}

export const local = new Dataer();
