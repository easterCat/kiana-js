/**
 * Created by easterCat on 2018/4/13.
 */

//数组
import * as arr from "./arrays/index";
import { flatten } from "./arrays/flatten";
//函数
import * as func from "./functions/index";
//对象
import * as obj from "./objects/index";
//cookie操作
import { getCookie } from "./cookie/getCookie";
import { removeCookie } from "./cookie/removeCookie";
import { setCookie } from "./cookie/setCookie";
//时间方法
import * as time from "./time/index";
//浏览器方法
import * as browser from "./browser/browser";
//设备判断
import * as mobile from "./browser/mobile";
//本地存储
import { getLocal } from "./localStorage/getLocal";
import { initLocal } from "./localStorage/initLocal";
import { setLocal } from "./localStorage/setLocal";
//会话存储
import { getSession } from "./sessionStorage/getSession";
import { initSession } from "./sessionStorage/initSession";
import { setSession } from "./sessionStorage/setSession";
//日期方法
import * as date from "./date/date";
//工具方法
import { fileDownload } from "./utils/fileDownload";
import { resetElement } from "./utils/resetElement";
import { imageDownload } from "./utils/imageDownload";
import { copyText } from "./utils/copyText";
import { formatMoney } from "./utils/formatMoney";
import { parseTime } from "./utils/parseTime";
import { formatTime } from "./utils/formatTime";
import { paramToObj } from "./utils/paramToObj";
import { formatCurrency } from "./utils/formatCurrency";
import { switchSecond } from "./utils/switchSecond";
import { screenfull } from "./utils/screenfull";

export default Object.assign(
    {},
    arr,
    func,
    obj,
    { getCookie },
    { removeCookie },
    { setCookie },
    time,
    browser,
    mobile,
    { getLocal },
    { initLocal },
    { setLocal },
    { getSession },
    { initSession },
    { setSession },
    date,
    { fileDownload },
    { resetElement },
    { copyText },
    { imageDownload },
    { formatMoney },
    { parseTime },
    { formatTime },
    { paramToObj },
    { formatCurrency },
    { switchSecond },
    { screenfull }
);
