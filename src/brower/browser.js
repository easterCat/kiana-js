let Browser = new class {
  constructor() {
    this.browserName = this.getBrowserInfo();
  }

  getBrowserInfo() {
    let browserName;
    let browserVersion;

    if (navigator) {
      let ua = window.navigator.userAgent.toLowerCase();

      if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
        browserName = "IE";
        browserVersion = ua.match(/msie ([\d.]+)/) != null ? ua.match(/msie ([\d.]+)/)[1] : ua.match(/rv:([\d.]+)/)[1];
      } else if (ua.match(/micromessenger/) != null) {
        browserName = "微信";
      } else if (ua.match(/firefox/) != null) {
        browserName = "火狐";
      } else if (ua.match(/ubrowser/) != null) {
        browserName = "UC";
      } else if (ua.match(/opera/) != null) {
        browserName = "Opera";
      } else if (ua.match(/bidubrowser/) != null) {
        browserName = "百度";
      } else if (ua.match(/metasr/) != null) {
        browserName = "搜狗";
      } else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        browserName = "QQ";
      } else if (ua.match(/maxthon/) != null) {
        browserName = "遨游";
      } else if (ua.match(/chrome/) != null) {
        let is360 = this._mime("type", "application/vnd.chromium.remoting-viewer");
        if (is360) {
          browserName = "360";
        } else {
          browserName = "Chrome";
        }
      } else if (ua.match(/safari/) != null) {
        browserName = "Safari";
      }
    } else {
      browserName = "UnKnown";
    }

    console.group("浏览器信息");
    console.log("浏览器名称:", browserName);
    console.log("浏览器版本:", browserVersion);
    console.groupEnd();

    return browserName;
  }

  _mime(option, value) {
    let mimeTypes = navigator.mimeTypes;
    for (let mt in mimeTypes) {
      if (mimeTypes[mt][option] === value) {
        return true;
      }
    }
    return false;
  }
}();

export default Browser;
