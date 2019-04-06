function initLocal() {
  localStorage.clear();
}


function getLocal(name) {
  if (localStorage.getItem(name)) {
    return JSON.parse(localStorage.getItem(name));
  }
}

function setLocal(name, data) {
  var store = localStorage.getItem(name);
  if (store) {
    console.warn(name + "=>数据在localStorage已存在,执行替换操作");
    localStorage.removeItem(name);
  }
  localStorage.setItem(name, JSON.stringify(data));
}


//sessionStorage 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据
export {initLocal, getLocal, setLocal};
