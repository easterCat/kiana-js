/**
 * Created by easterCat on 2019/4/6.
 */

//用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据
export function getSession(name) {
  if (name && sessionStorage.getItem(name)) {
    let data = sessionStorage.getItem(name);
    return _deserialize(data);
  }
}

function _deserialize(value) {
  if (typeof value !== 'string') {
    return undefined;
  }

  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}

//https://segmentfault.com/q/1010000008460413?_ea=1654512
function isJSON(str, pass_object) {
  if (pass_object && isObject(str)) return true;

  if (!isString(str)) return false;

  str = str.replace(/\s/g, '').replace(/\n|\r/, '');

  if (/^\{(.*?)\}$/.test(str))
    return /"(.*?)":(.*?)/g.test(str);

  if (/^\[(.*?)\]$/.test(str)) {
    return str.replace(/^\[/, '')
      .replace(/\]$/, '')
      .replace(/},{/g, '}\n{')
      .split(/\n/)
      .map(function (s) {
        return isJSON(s);
      })
      .reduce(function (prev, curr) {
        return !!curr;
      });
  }

  return false;
}
