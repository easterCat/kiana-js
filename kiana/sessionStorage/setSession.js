/**
 * Created by easterCat on 2019/4/6.
 */

export function setSession(name, data) {
  if (name) {
    let store = window.sessionStorage.getItem(name);
    if (store) {
      console.warn(name + "=>数据在sessionStorage已存在,执行替换操作");
      window.sessionStorage.removeItem(name);
    }

    return window.sessionStorage.setItem(name, JSON.stringify(data));
  }
}



