function setCookie(key, val, time) {
  let date = new Date();
  let expiresDays = time;
  date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
  document.cookie = key + "=" + val + ";expires=" + date.toGMTString();
}

function getCookie(key) {
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

function removeCookie(key) {
  let date = new Date();
  date.setTime(date.getTime() - 10000);
  document.cookie = key + "=v; expires =" + date.toGMTString();
}

export {setCookie, getCookie, removeCookie};
