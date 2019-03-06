export { today, yesterday };

function today(type) {
    var date = new Date();
    var seperater = "-";
    var year = date.getFullYear();
    var month = _patch_zero(date.getMonth() + 1);
    var day = _patch_zero(date.getDate());
    var time_arr = [year, seperater, month, seperater, day];

    return time_arr.join("");
}

function yesterday(type) {
    var date = new Date();
    var seperater = "-";
    var year = date.getFullYear();
    var month = _patch_zero(date.getMonth() + 1);
    var day = _patch_zero(date.getDate() - 1);
    var time_arr = [year, seperater, month, seperater, day];

    return time_arr.join("");
}

function _patch_zero(num) {
    return num < 0 ? "0" + num : num;
}
