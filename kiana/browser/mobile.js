//判断是否是移动端
//https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser

// mozilla/5.0 (linux; android 6.0; nexus 5 build/mra58n) applewebkit/537.36 (khtml, like gecko) chrome/72.0.3626.109 mobile safari/537.36
// Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Mobile Safari/537.36
let ua = window.navigator.userAgent.toLocaleLowerCase();

function isMobile() {
  if (ua.match(/android/i)
    || ua.match(/webos/i)
    || ua.match(/iphone/i)
    || ua.match(/ipad/i)
    || ua.match(/ipod/i)
    || ua.match(/blackberry/i)
    || ua.match(/windows phone/i)
  ) {
    return true;
  } else {
    return false;
  }
}

function isIphone() {
  if (ua.match(/iphone/i)) {
    return true;
  } else {
    return false;
  }
}

function isAndroid() {
  if (ua.match(/android/i)) {
    return true;
  } else {
    return false;
  }
}

export {
  isMobile,
  isIphone,
  isAndroid
};

