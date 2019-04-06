/**
 * Created by easterCat on 2019/4/6.
 */

export function removeCookie(key) {
  let date = new Date();
  date.setTime(date.getTime() - 10000);
  document.cookie = key + "=v; expires =" + date.toGMTString();
}
