// https://stackoverflow.com/questions/43142304/how-to-augment-the-vue-class-and-keep-typescript-definition-in-sync/43232151#43232151
// 1. Make sure to import 'vue' before declaring augmented types
import Vue from 'vue';
import * as $u from '@/utils';

// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    // TODO
    $u: typeof $u;
  }
}

declare global {
  const config: {
    API_SERVER: string,
  };
}
