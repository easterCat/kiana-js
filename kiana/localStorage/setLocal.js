/**
 * Created by easterCat on 2019/4/6.
 */

export function setLocal(name, data) {
  var store = localStorage.getItem(name);
  if (store) {
    console.warn(name + "=>数据在localStorage已存在,执行替换操作");
    localStorage.removeItem(name);
  }
  localStorage.setItem(name, JSON.stringify(data));
}
