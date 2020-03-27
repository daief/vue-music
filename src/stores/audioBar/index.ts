/**
 * vuex store
 * audioBar store
 */

import { state, AudioBarState } from './state';
import { mutations } from './mutations';
import { setterActions, actions } from './actions';

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

// just for resolving old import
export { AudioBarState };
