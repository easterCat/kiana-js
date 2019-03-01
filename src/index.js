/**
 * Created by easterCat on 2018/4/13.
 */

import * as arr from "./arrays/index";
import * as func from "./functions/index";
import * as obj from "./objects/index";
import * as cookie from "./cookie/index";
import * as time from "./time/index";

const kiana = {
  ...arr,
  ...func,
  ...obj,
  ...cookie,
  ...time
};

export default kiana;
