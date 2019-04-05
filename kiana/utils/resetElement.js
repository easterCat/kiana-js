/**
 * @Author : easterCat
 * @Date : 2019/3/21
 * @Last Modified by : easterCat
 * @Last Modified time : 2019/3/21
 */


/**
 * 重置当前元素节点
 * @param id
 */
export function resetElement(id) {
    var element = _id(id);
    if (element) {
        var parentElement = element.parentNode;
        parentElement.removeChild(element);

        var newElement = document.createElement("div");
        newElement.setAttribute("id", id);
        parentElement.appendChild(newElement);
        return "reset";
    } else {
        return "new";
    }
}

function _id(id) {
    return document.getElementById(id);
}
