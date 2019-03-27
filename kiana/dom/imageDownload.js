/**
 * @Author : easterCat
 * @Date : 2019/3/27
 * @Last Modified by : easterCat
 * @Last Modified time : 2019/3/27
 */

export function imageDownload(id, filename) {
    var img_element = document.getElementById(id);
    if (!img_element) {
        throw new Error("该图片不存在");
    }
    var save_link = document.createElement("a");
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.style.display = "none";
    save_link.href = img_element.src;
    save_link.download = filename;
    document.body.appendChild(save_link);
    save_link.dispatchEvent(event);
    document.body.removeChild(save_link);
}
