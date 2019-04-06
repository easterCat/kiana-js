/**
 * Created by easterCat on 2018/4/13.
 */

//数组
import * as arr from "./arrays/index";
import {flatten} from "./arrays/flatten";
//函数
import * as func from "./functions/index";
//对象
import * as obj from "./objects/index";
//cookie操作
import * as cookie from "./cookie/index";
//时间方法
import * as time from "./time/index";
//浏览器方法
import * as browser from "./browser/browser";
//设备判断
import * as mobile from "./browser/mobile";
//本地存储
import * as localStorage from "./localStorage";
//会话存储
import * as sessionStorage from "./sessionStorage";
import * as localStorage from "./localStorage";
//日期方法
import * as date from "./date/date";
//工具方法
import {fileDownload} from "./utils/fileDownload";
import {resetElement} from "./utils/resetElement";
import {imageDownload} from "./utils/imageDownload";
import {copyText} from "./utils/copyText";

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
  localStorage,
  date,
  {fileDownload},
  {resetElement},
  {copyText},
  {imageDownload},
);
