/**
 * Created by easterCat on 2018/4/13.
 */

import * as arr from "./src/arrays/index";
import * as func from "./src/functions/index";
import * as obj from "./src/objects/index";
import * as cookie from "./src/cookie/index";
import * as time from "./src/time/index";
import * as browser from "./src/browser/browser";
import * as mobile from "./src/browser/mobile";
import * as localStorage from "./src/storage/localStorage";
import * as sessionStorage from "./src/storage/sessionStorage";

const kiana = Object.assign(
    {},
    arr,
    func,
    obj,
    cookie,
    time,
    browser,
    mobile,
    localStorage
);

export default kiana;
