import { instance } from './axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpRes, DelayResult } from '@/interfaces';

export * from './localStorage';

/**
 * 输入多个参数，一般用于根据多级 index 生成 key，返回字符串：param1-param2- ...
 * @param args 参数
 */
export function generateKey(...args: Array<string | number>) {
  return args.join('-');
}

/**
 * 将（毫）秒数格式化为时分秒（00:00:00），若不满小时则省去前置 00:
 * @param second 秒数或毫秒数
 * @param isMilli 是否毫秒数
 */
export function formatSecond(second: number, isMilli: boolean = false) {
  const t = Math.floor(isMilli ? second / 1000 : second);
  const hour = Math.floor(t / 3600);
  const min = Math.floor(t % 3600 / 60);
  const sec = t % 60;

  return [hour, min, sec]
    .filter((val, index) => index !== 0 || val > 0)
    .map((val) => `00${val}`.slice(-2))
    .join(':');
}

/**
 * 时分秒格式字符串转为毫秒数
 * @param str 时分秒格式字符串
 */
export function format2millisecond(str: string) {
  return str
    .trim()
    .split(':')
    .map((s) => +s)
    .reverse()
    .reduce((pre, next) => pre + next * 60) * 1000;
}

/**
 * 处理 axios 请求结果
 * @param p axios request response
 */
const dealAxiosResult = (p: Promise<AxiosResponse>): Promise<HttpRes> => p.then((res: AxiosResponse) => {
  if (res.data.code === 200) {
    return res.data || {};
  } else {
    return {
      ...res.data,
      failMark: true,
    };
  }
}).catch((err) => ({
  failMark: true,
  httpError: err,
}));

/**
 * axios post method
 * @param url url
 * @param data payload data
 * @param config axios config
 */
export function post(url: string, data?: any, config?: AxiosRequestConfig): Promise<HttpRes> {
  return dealAxiosResult(instance.post(url, data, config));
}

/**
 * axios get method
 * @param url url
 * @param config axios config
 */
export function get(url: string, config?: AxiosRequestConfig): Promise<HttpRes> {
  return dealAxiosResult(instance.get(url, config));
}

/**
 * 从对象中安全地取值
 * @param obj 目标对象
 * @param prop 属性
 * @param defaultVal 默认返回值
 */
export function getProp(obj: any, prop: string, defaultVal: any): any {
  if (obj && obj[prop]) {
    return obj[prop];
  } else {
    return defaultVal;
  }
}

/**
 * 误差检查函数
 * @param left 数值1
 * @param right 数值2
 */
export function withinErrorMargin(left: number, right: number): boolean {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

export interface ControlScrollParam {
  el: HTMLElement;
  duration: number;
  y: number;
  endCall?: () => void;
}

/**
 * 将元素在指定时长内滚动到指定位置(y轴)
 * @param el html 元素
 * @param duration 时长
 * @param y 目标位置
 */
export function controlScroll(param: ControlScrollParam): () => void {
  const {
    el,
    duration,
    y,
    endCall = () => void 0,
  } = param;

  let {scrollTop} = el;
  const deltY = y - scrollTop;

  let lastTime = 0;
  let canContinue = true;

  const loop = (now: number) => {
    if (lastTime === 0) {
      lastTime = now;
    }
    const deltTime = now - lastTime;
    const perMoveY = withinErrorMargin(deltTime, 0) ? 0 : deltY / (duration / 1000) * (deltTime / 1000);
    scrollTop += perMoveY;

    el.scrollTo({
      left: 0,
      top: scrollTop,
      behavior: 'instant',
    });

    if (Math.abs(el.scrollTop - y) >= 6 && canContinue) {
      lastTime = now;
      window.requestAnimationFrame(loop);
    } else {
      // end or cancel
      endCall();
    }
  };

  window.requestAnimationFrame(loop);

  return function clear() {
    canContinue =  false;
  };
}

/**
 * promise 封装的 setTimeout，delay(...).promise.then(...)
 * @param func 回调
 * @param millisecond 毫秒数
 * @param options 传递给回调的参数
 */
export function delay(func: (...args: any[]) => any, millisecond: number, options?: any): DelayResult {
  let timer = 0;
  let reject: any = null;
  const promise = new Promise((resolve, tmpReject) => {
    reject = tmpReject;
    timer = window.setTimeout(() => {
      resolve(func(options));
    }, millisecond);
  });

  return {
    get promise() {
      return promise;
    },
    cancel() {
      if (timer) {
        clearTimeout(timer);
        timer = 0;
        reject(new Error('timer is cancelled'));
        reject = null;
      }
    },
  };
}
