import { ActionTree, MutationTree } from 'vuex';
import { RootState } from '@/store';
import { Song } from '@/interfaces';
import { inBuiltList } from './inBuiltList';

export interface AudioBarState {
  player: HTMLAudioElement;
  isPlaying: boolean;
  canPlay: boolean;
  currentTime: number;
  duration: number;
  bufferedTime: number;
  isWaiting: boolean;
  playList: Song[];
  song: Song | null;
  isShowList: boolean;
  isShowVolume: boolean;
}

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
}

const state: AudioBarState = {
  // aoid judging is player null, player must exist
  player: null as any,
  isPlaying: false,
  canPlay: false,
  currentTime: 0,
  duration: 0,
  bufferedTime: 0,
  isWaiting: false,
  playList: inBuiltList,
  // 当前播放歌曲
  song: inBuiltList[1],
  isShowList: false,
  isShowVolume: false,
};

const mutations: MutationTree<AudioBarState> = {
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
    s.playList = list;
  },
  [TYPES.SET_SONG](s, v: Song) {
    s.song = v;
  },
  [TYPES.SET_ISSHOWLIST](s, v: boolean) {
    s.isShowList = v;
  },
  [TYPES.SET_ISSHOWVOLUME](s, v: boolean) {
    s.isShowVolume = v;
  },
};

const setterActions: ActionTree<AudioBarState, RootState> = {
  // get audio DOM
  setPlayer({commit}, ele) {
    commit(TYPES.SET_PLAYER, ele);
  },
  setIsPlaying({commit}, status) {
    commit(TYPES.SET_ISPLAYING, status);
  },
  setCanplay({commit}, status) {
    commit(TYPES.SET_CANPLAY, status);
  },
  setCurrentTime({commit}, t) {
    commit(TYPES.SET_CURRENTTIME, t);
  },
  setDuration({commit}, t) {
    commit(TYPES.SET_DURATION, t);
  },
  setBufferedTime({commit}, t) {
    commit(TYPES.SET_BUFFEREDTIME, t);
  },
  setIsWaiting({commit}, v) {
    commit(TYPES.SET_ISWAITING, v);
  },
  setPlayList({commit}, t) {
    commit(TYPES.SET_PLAYLIST, t);
  },
  setSong({commit}, v) {
    commit(TYPES.SET_SONG, v);
  },
  setIsShowList({commit}, v) {
    commit(TYPES.SET_ISSHOWLIST, v);
  },
  setIsShowVolumet({commit}, v) {
    commit(TYPES.SET_ISSHOWVOLUME, v);
  },
  // ---------------------------- setter end
};

const actions: ActionTree<AudioBarState, RootState> = {
  play({commit, state: s}) {
    s.player.play().catch(() => void 0).then(() => {
      commit(TYPES.SET_ISPLAYING, true);
    });
  },
  pause({commit, state: s}) {
    s.player.pause();
    commit(TYPES.SET_ISPLAYING, false);
  },
  togglePlay({state: s, dispatch}) {
    if (s.isPlaying) {
      dispatch('pause');
    } else if (s.canPlay) {
      dispatch('play');
    }
  },
  // 设置缓冲情况
  setPlayerBuffered({dispatch, state: s}) {
    const {player} = s;
    if (player.readyState === 4) {
      dispatch('setBufferedTime', player.buffered.end(0));
    }
  },
  // 切换歌单面板显示隐藏
  toggleIsShowList({dispatch, state: s}) {
    if (s.isShowList) {
      dispatch('setIsShowList', false);
    } else {
      dispatch('setIsShowList', true);
    }
  },
  // 切换音量控制面板显示隐藏
  toggleIsShowVolume({dispatch, state: s}) {
    if (s.isShowVolume) {
      dispatch('setIsShowVolumet', false);
    } else {
      dispatch('setIsShowVolumet', true);
    }
  },
};

export const audioBar = {
  namespaced: true,
  state,
  mutations,
  actions: {
    ...setterActions,
    ...actions,
  },
};

// audio bar action
export const ABAction = (name: string) => `audioBar/${name}`;
