import { ActionTree, MutationTree } from 'vuex';
import { RootState } from '@/store';
import { Song, PlayList, PlayListTrack, DelayResult } from '@/interfaces';
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
  isShowMessage: boolean;
  message: string;
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
  SET_ISSHOWMESSAGE = 'SET_ISSHOWMESSAGE',
  SET_MESSAGE = 'SET_MESSAGE',
}

/**
 * 将 track 对象转换为 Song 对象
 * @param track
 */
export function track2Song(track: PlayListTrack): Song {
  return {
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
  };
}

/**
 * 是否正在拉取歌单详情，一个目的用于防止连续点击
 */
let isFetchingPlaylist: boolean = false;

let showMessageTimer: DelayResult | null = null;

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
  isShowMessage: false,
  message: '',
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
  [TYPES.SET_ISSHOWMESSAGE](s, v: boolean) {
    s.isShowMessage = v;
  },
  [TYPES.SET_MESSAGE](s, v: string) {
    s.message = v;
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
  setIsShowMessage({commit}, v) {
    commit(TYPES.SET_ISSHOWMESSAGE, v);
  },
  setMessage({commit}, v) {
    commit(TYPES.SET_MESSAGE, v);
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
  // 列表中设置歌曲为 id 并播放
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
      // XXX 后续其他类型一致统一处理
      case 'ALBUM': {
        promise = get(`/album?id=${id}`)
          .then((res) => {
            if (!res.failMark) {
              const list: PlayListTrack[] = res.songs;
              const songL: Song[] = (list || []).map(track2Song);
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
              const songL: Song[] = (list.tracks || []).map(track2Song);
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
  // 添加歌曲到列表
  addSongToList({commit, state: s}, obj: PlayListTrack | Song) {
    const isSong = (x: PlayListTrack | Song): x is Song => (x as Song).duration !== undefined;
    const song: Song = isSong(obj) ? obj : track2Song(obj);

    const {playList} = s;
    if (playList.find((tmpSong) => tmpSong.id === song.id)) {
      // song exists in list
    } else {
      const newList = [...playList, song];
      commit(TYPES.SET_PLAYLIST, newList);
    }
  },
  // 播放歌曲并加入到列表
  playANewSong({dispatch}, obj: PlayListTrack | Song) {
    dispatch('addSongToList', obj)
      .then(() => {
        // play
        dispatch('listSongIdAndPlay', obj.id);

        dispatch('showMessage', '已开始播放');
      });
  },
  // 弹出弹窗并自动关闭
  showMessage({dispatch}, msg: string) {
    if (showMessageTimer) {
      showMessageTimer.cancel();
    }

    dispatch('setIsShowMessage', true);
    dispatch('setMessage', msg);

    showMessageTimer = delay(() => {
      dispatch('setIsShowMessage', false);
    }, 3000);
    showMessageTimer.promise.catch(() => {/* */});
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
