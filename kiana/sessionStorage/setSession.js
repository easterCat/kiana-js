/**
 * Created by easterCat on 2019/4/6.
 */

export function setSession(name, data) {
    var store = sessionStorage.getItem(name);
    if (store) {
        console.warn(name + "=>数据在sessionStorage已存在,执行替换操作");
        sessionStorage.removeItem(name);
    }

    if (typeof data === 'object') {
        sessionStorage.setItem(name, JSON.stringify(data));
    } else {
        sessionStorage.setItem(name, data);
    }
}
