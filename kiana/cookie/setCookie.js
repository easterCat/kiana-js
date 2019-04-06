/**
 * Created by easterCat on 2019/4/6.
 */


export function setCookie(key, val, time) {
  let date = new Date();
  let expiresDays = time;
  date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
  document.cookie = key + "=" + val + ";expires=" + date.toGMTString();
}
