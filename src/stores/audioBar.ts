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
  song: inBuiltList[0],
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
    s.player.play().then((e) => {
      commit(TYPES.SET_ISPLAYING, true);
    }).catch((e) => {
      // tslint:disable no-console
      console.warn('player play err', e);
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
  // 列表上一首
  listPre({dispatch, state: s}) {
    const {song, playList} = s;
    if (song) {
      const i = playList.findIndex((tmpSong) => tmpSong.id === song.id);
      const {length} = playList;
      dispatch('setSong', length > 0 ? playList[(length + i - 1) % length] : song);
    }
  },
  // 列表下一首
  listNext({dispatch, state: s}) {
    const {song, playList} = s;
    if (song) {
      const i = playList.findIndex((tmpSong) => tmpSong.id === song.id);
      const {length} = playList;
      return dispatch('setSong', length > 0 ? playList[(length + i + 1) % length] : song);
    }
  },
  // 列表随机
  listRandom({dispatch, state: s}) {
    const {song, playList} = s;
    if (song) {
      const {length} = playList;
      const rd = Math.floor(Math.random() * length);
      dispatch('setSong', length > 0 ? playList[rd] : song);
    }
  },
  // 歌曲切换时控制是否连续播放
  ctrlAudioLoadAndPlay({dispatch, state: s}, payload: {
    load?: boolean
    play?: boolean,
  }) {
    const {player} = s;
    const {load, play} = {load: true, play: true, ...payload};
    console.log(load, play);
    if (!player) {
      return;
    }
    if (load) {
      player.load();
    }
    if (play) {
      dispatch('play');
    }
  },
  // 设置歌曲为 id 并播放
  listSongIdAndPlay({dispatch, state: s}, id: number) {
    const {playList} = s;
    const song = playList.find((tmpSong) => tmpSong.id === id);
    if (song) {
      dispatch('setSong', song).then(() => {
        dispatch('ctrlAudioLoadAndPlay');
      });
    }
  },
  // 删除列表歌曲，
  deleteListSongIdAndPlay({dispatch, state: s}, id: number) {
    const {playList, song, isPlaying} = s;
    const targetIdx = playList.findIndex((tmpSong) => tmpSong.id === id);
    if (targetIdx > -1) {
      playList.splice(targetIdx, 1);
      dispatch('setPlayList', [...playList]);
    }
    if (song && song.id === id) {
      dispatch('listNext').then(() => {
        dispatch('ctrlAudioLoadAndPlay', isPlaying);
      });
    }
  },
  // 关闭所有框框，列表、音量、以及未来的其他
  closeAllModal({commit}) {
    commit(TYPES.SET_ISSHOWLIST, false);
    commit(TYPES.SET_ISSHOWVOLUME, false);
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
