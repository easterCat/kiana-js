/**
 * Created by easterCat on 2018/4/13.
 */

//数组
import * as arr from "./kiana/arrays/index";
//函数
import * as func from "./kiana/functions/index";
//对象
import * as obj from "./kiana/objects/index";
//cookie操作
import * as cookie from "./kiana/cookie/index";
//时间方法
import * as time from "./kiana/time/index";
//浏览器方法
import * as browser from "./kiana/browser/browser";
//设备判断
import * as mobile from "./kiana/browser/mobile";
//本地存储
import * as localStorage from "./kiana/localStorage";
//会话存储
import * as sessionStorage from "./kiana/sessionStorage";
//日期方法
import * as date from "./kiana/date/date";
//工具方法
import {fileDownload} from "./kiana/dom/fileDownload";
import {resetElement} from "./kiana/dom/resetElement";
import {copyText} from "./kiana/dom/copyText";

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
