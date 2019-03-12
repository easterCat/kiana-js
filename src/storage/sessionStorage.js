function initSession() {
    sessionStorage.clear();
}

function getSession(name) {
    if (sessionStorage.getItem(name)) {
        return JSON.parse(sessionStorage.getItem(name));
    }
}

function setSession(name, data) {
    var store = sessionStorage.getItem(name);
    if (store) {
        console.warn("当前数据已存在,执行替换操作");
        sessionStorage.removeItem(name);
    }
    sessionStorage.setItem(name, JSON.stringify(data));
}

//sessionStorage 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据
export {
    initSession,
    getSession,
    setSession
};
