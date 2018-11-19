import { ActionTree, MutationTree } from 'vuex';
import { RootState } from '@/store';
import { Song, PlayList, PlayListTrack } from '@/interfaces';
import { inBuiltList } from './inBuiltList';
import { get, local, delay } from '@/utils';

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

/**
 * 是否正在拉取歌单详情，一个目的用于防止连续点击
 */
let isFetchingPlaylist: boolean = false;

const localPlayList = local.getLocalPlayList();
const initList = localPlayList.length > 0 ? localPlayList : inBuiltList;
const localPlaySong: Song | null = local.getLocalPlaySong();

const state: AudioBarState = {
  // aoid judging is player null, player must exist
  player: null as any,
  isPlaying: false,
  canPlay: false,
  currentTime: 0,
  duration: 0,
  bufferedTime: 0,
  isWaiting: false,
  playList: initList,
  // 当前播放歌曲
  song: localPlaySong ? localPlaySong : initList[0],
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
  // XXX 开始播放一个新的列表，暂时默认为普通歌单
  startPlayNewList({commit, dispatch}, payload: {
    id: number;
    type?: string
  }) {
    if (isFetchingPlaylist) { return; }
    isFetchingPlaylist = true;
    const {id, type} = payload;
    let promise: Promise<any>;
    switch (type) {
      case 'ALBUM': {
        promise = get(`/album?id=${id}`)
          .then((res) => {
            if (!res.failMark) {
              const list: PlayListTrack[] = res.songs;
              const songL: Song[] = (list || []).map((track) => ({
                album: track.al,
                alias: track.alia,
                artists: track.ar,
                duration: track.dt,
                id: track.id,
                mvid: track.mv,
                name: track.name,
                cd: track.cd,
                position: track.pst,
                source: null,
              }));
              console.log(songL);
              if (songL.length > 0) {
                // 设置新列表
                commit(TYPES.SET_PLAYLIST, songL);
                // 播放第一首
                dispatch('setSong', songL[0]).then(() => {
                  dispatch('ctrlAudioLoadAndPlay');
                });
              }
            }
          });
        break;
      }
      case 'PLAY_LIST':
      default: {
        promise = get(`/playlist/detail?id=${id}`)
          .then((res) => {
            if (!res.failMark) {
              const list: PlayList = res.playlist;
              const songL: Song[] = (list.tracks || []).map((track) => ({
                album: track.al,
                alias: track.alia,
                artists: track.ar,
                duration: track.dt,
                id: track.id,
                mvid: track.mv,
                name: track.name,
                cd: track.cd,
                position: track.pst,
                source: null,
              }));
              if (songL.length > 0) {
                // 设置新列表
                commit(TYPES.SET_PLAYLIST, songL);
                // 播放第一首
                dispatch('setSong', songL[0]).then(() => {
                  dispatch('ctrlAudioLoadAndPlay');
                });
              }
            }
          });
        break;
      }
    }
    promise.then(() => {
      isFetchingPlaylist = false;
    });
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
