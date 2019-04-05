/**
 * @Author : easterCat
 * @Date : 2019/3/21
 * @Last Modified by : easterCat
 * @Last Modified time : 2019/3/21
 */

//https://github.com/sudodoki/copy-to-clipboard
export function copyText(text) {
    var range = document.createRange();
    var selection = document.getSelection();
    var mark = document.createElement('span');

    mark.textContent = text;
    mark.style.all = 'unset';
    mark.style.position = 'fixed';
    mark.style.top = "0px";
    mark.style.clip = 'rect(0, 0, 0, 0)';
    mark.style.whiteSpace = 'pre';
    mark.style.webkitUserSelect = 'text';
    mark.style.MozUserSelect = 'text';
    mark.style.msUserSelect = 'text';
    mark.style.userSelect = 'text';

    document.body.appendChild(mark);
    range.selectNode(mark);
    selection.addRange(range);
    var successful = document.execCommand('copy');
    if (!successful) {
        throw new Error('copy command was unsuccessful');
    }
}
