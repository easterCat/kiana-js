//https://github.com/kennethjiang/js-file-download/blob/master/file-download.js
//https://developer.mozilla.org/zh-CN/docs/Web/API/Blob

export function fileDownload(data, filename, mime) {
    var blob;
    if (/image/.test(mime)) {
        blob = base64ToBlob(data);
    } else {
        blob = dataToBlob(mime);
    }

    if (window.navigator.msSaveBlob) { // if browser is IE
        window.navigator.msSaveBlob(blob, filename); //filename文件名包括扩展名，下载路径为浏览器默认路径
    } else {
        var blobURL = window.URL.createObjectURL(blob);
        var aLink = document.createElement('a');
        aLink.style.display = 'none';
        aLink.href = blobURL;
        aLink.setAttribute('download', filename);
        if (!aLink.download) {
            aLink.setAttribute('target', '_blank');
        }
        document.body.appendChild(aLink);
        aLink.click();
        document.body.removeChild(aLink);
        window.URL.revokeObjectURL(blobURL);
    }
}


function base64ToBlob(url) {
    //arr[0] : data:image/png;base64
    //arr[1] : iVBORw0KGgoAAAANSUhEUgAAAXIAAAKrCAYAAADs/Q......
    var arr = url.split(',');
    var bstr = atob(arr[1]);
    var mime = arr[0].match(/:(.*?);/)[1]
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

function dataToBlob(mime) {
    return new Blob([data], {type: mime || 'application/octet-stream'});
}


// 废弃
// export function imgDownload(id, filename) {
//     let img = document.getElementById(id);
//     if (!img) {
//         throw new Error("该图片不存在");
//     }
//     let a = document.createElement("a");
//     a.style.display = "none";
//     a.href = img.src;
//     a.download = filename;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
// }
