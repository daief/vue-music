import { Song } from '@/interfaces';
import { inBuiltList } from './inBuiltList';
import { local } from '@/utils';


const localPlayList = local.getLocalPlayList();
const initList = localPlayList.length > 0 ? localPlayList : inBuiltList;
const localPlaySong: Song | null = local.getLocalPlaySong();

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

export const state: AudioBarState = {
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
