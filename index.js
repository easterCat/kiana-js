/**
 * Created by easterCat on 2018/4/13.
 */

//数组
import * as arr from "./src/arrays/index";
//函数
import * as func from "./src/functions/index";
//对象
import * as obj from "./src/objects/index";
//cookie操作
import * as cookie from "./src/cookie/index";
//时间方法
import * as time from "./src/time/index";
//浏览器方法
import * as browser from "./src/browser/browser";
//设备判断
import * as mobile from "./src/browser/mobile";
//本地存储
import * as localStorage from "./src/localStorage";
//会话存储
import * as sessionStorage from "./src/sessionStorage";
//日期方法
import * as date from "./src/date/date";
//工具方法
import {fileDownload} from "./src/dom/download";
import {resetElement} from "./src/dom/resetElement";
import {copyText} from "./src/dom/copyText";

export default Object.assign(
    {},
    arr,
    func,
    obj,
    cookie,
    time,
    browser,
    mobile,
    localStorage,
    sessionStorage,
    date,
    {fileDownload},
    {resetElement},
    {copyText},
);
