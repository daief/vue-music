import { MutationTree } from 'vuex';
import { Song } from '@/interfaces';
import { local, delay } from '@/utils';
import { AudioBarState } from './state';

export enum TYPES {
  SET_PLAYER = 'SET_PLAYER',
  SET_ISPLAYING = 'SET_ISPLAYING',
  SET_CANPLAY = 'SET_CANPLAY',
  SET_CURRENTTIME = 'SET_CURRENTTIME',
  SET_DURATION = 'SET_DURATION',
  SET_BUFFEREDTIME = 'SET_BUFFEREDTIME',
  SET_ISWAITING = 'SET_ISWAITING',
  SET_PLAYLIST = 'SET_PLAYLIST',
  SET_SONG = 'SET_SONG',
  SET_ISSHOWLIST = 'SET_ISSHOWLIST',
  SET_ISSHOWVOLUME = 'SET_ISSHOWVOLUME',
  SET_ISSHOWMESSAGE = 'SET_ISSHOWMESSAGE',
  SET_MESSAGE = 'SET_MESSAGE',
}

export const mutations: MutationTree<AudioBarState> = {
  [TYPES.SET_PLAYER](s, ele: HTMLAudioElement) {
    s.player = ele;
  },
  [TYPES.SET_ISPLAYING](s, status: boolean) {
    s.isPlaying = status;
  },
  [TYPES.SET_CANPLAY](s, status: boolean) {
    s.canPlay = status;
  },
  [TYPES.SET_CURRENTTIME](s, t: number) {
    s.currentTime = t;
  },
  [TYPES.SET_DURATION](s, t: number) {
    s.duration = t;
  },
  [TYPES.SET_BUFFEREDTIME](s, v: number) {
    s.bufferedTime = v;
  },
  [TYPES.SET_ISWAITING](s, v: boolean) {
    s.isWaiting = v;
  },
  [TYPES.SET_PLAYLIST](s, list: Song[]) {
    // 设置歌单列表时存储于本地，加入下次事件循环
    delay(() => local.setLocal(local.KEYS.PLAY_LIST, list), 10);
    s.playList = list;
  },
  [TYPES.SET_SONG](s, v: Song) {
    // 切换歌曲时存储于本地
    delay(() => local.setLocal(local.KEYS.PLAY_SONG, v), 10);
    s.song = v;
  },
  [TYPES.SET_ISSHOWLIST](s, v: boolean) {
    s.isShowList = v;
  },
  [TYPES.SET_ISSHOWVOLUME](s, v: boolean) {
    s.isShowVolume = v;
  },
  [TYPES.SET_ISSHOWMESSAGE](s, v: boolean) {
    s.isShowMessage = v;
  },
  [TYPES.SET_MESSAGE](s, v: string) {
    s.message = v;
  },
};
