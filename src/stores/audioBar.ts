import { ActionTree } from 'vuex';
import { RootState } from '@/store';

export interface AudioBarState {
  player: HTMLAudioElement | null;
  isPlaying: boolean;
  canPlay: boolean;
  currentTime: number;
  duration: number;
}

export enum TYPES {
  SET_PLAYER = 'SET_PLAYER',
  SET_ISPLAYING = 'SET_ISPLAYING',
}

const state: AudioBarState = {
  player: null,
  isPlaying: false,
  canPlay: false,
  currentTime: 0,
  duration: 0,
};

const mutations = {
  [TYPES.SET_PLAYER](s: AudioBarState, ele: HTMLAudioElement) {
    s.player = ele;
  },
  [TYPES.SET_ISPLAYING](s: AudioBarState, status: boolean) {
    s.isPlaying = status;
  },
};

const actions: ActionTree<AudioBarState, RootState> = {
  // get audio DOM
  setPlayer({commit}, ele) {
    commit(TYPES.SET_PLAYER, ele);
  },
  setIsPlaying({commit}, status) {
    commit(TYPES.SET_ISPLAYING, status);
  },
};

export const audioBar = {
  namespaced: true,
  state,
  mutations,
  actions,
};
