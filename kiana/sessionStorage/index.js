const store = {
  init: initSession,
  set: setSession,
  get: getSession,
  remove: removeSession,
};

export default store;


function initSession() {
  sessionStorage.clear();
}

function getSession(name) {
  if (name && sessionStorage.getItem(name)) {
    let data = sessionStorage.getItem(name);
    return _deserialize(data);
  }
}

function setSession(name, data) {
  if (name) {
    let store = window.sessionStorage.getItem(name);
    if (store) {
      console.warn(name + "=>数据在sessionStorage已存在,执行替换操作");
      window.sessionStorage.removeItem(name);
    }

    return window.sessionStorage.setItem(name, JSON.stringify(data));
  }
}

function removeSession(name) {
  if (name) {
    return sessionStorage.removeItem(name);
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
