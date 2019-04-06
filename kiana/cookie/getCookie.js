/**
 * Created by easterCat on 2019/4/6.
 */

export function getCookie(key) {
  let getCookie = document.cookie.replace(/[ ]/g, "");
  let arrCookie = getCookie.split(";");
  let tips;
  for (let i = 0; i < arrCookie.length; i++) {
    let arr = arrCookie[i].split("=");
    if (key === arr[0]) {
      tips = arr[1];
      break;
    }
  }
  return tips;
}
