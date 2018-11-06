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
