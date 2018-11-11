
enum K {
  VOLUME = 'VOLUME',
  LOOP_TYPE = 'LOOP_TYPE',
  SONG_LIST = 'SONG_LIST',
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

  public getLocalVolume() {
    const rs = this.getLocal(this.KEYS.VOLUME);
    return /^0\.\d+$/.test(rs) ? +rs : 0.75;
  }

  public getLocalLoopType() {
    const rs = this.getLocal(this.KEYS.LOOP_TYPE);
    const types = ['order', 'random', 'one'];
    return types.indexOf(rs) > -1 ? rs : types[0];
  }

  private localKey(key: string) {
    return `${key}-${this.VER}`;
  }
}

export const local = new Dataer();
