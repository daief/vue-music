import Vue from 'vue';
import Vuex from 'vuex';
import { AudioBarState, audioBar } from './stores/audioBar';

Vue.use(Vuex);

export interface RootState {
  audioBar: AudioBarState;
}

export default new Vuex.Store<RootState>({
  modules: {
    audioBar,
  },
});

