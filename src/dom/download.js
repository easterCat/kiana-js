//https://github.com/kennethjiang/js-file-download/blob/master/file-download.js

export function fileDownload(data, filename, mime) {
    var blob = new Blob([data], {type: mime || 'application/octet-stream'});
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        var blobURL = window.URL.createObjectURL(blob);
        var tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        tempLink.setAttribute('download', filename);

        if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank');
        }

        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
    }
}


// 废弃
// export function imgDownload(id, name) {
//     let img = document.getElementById(id);
//     if (!img) {
//         throw new Error("该图片不存在");
//     }
//     let a = document.createElement("a");
//     a.style.display = "none";
//     a.href = img.src;
//     a.download = name;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
// }
