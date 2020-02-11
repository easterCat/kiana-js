/**
 * 秒与毫秒转换
 * @param {object} - 原始值
 * @param {Number} - type为1秒转毫秒,type为2毫秒转秒
 * @returns {survival}
 */
export function switchSecond(value, type) {
    if (!value || !/^\d+$/.test(value)) return;
    if (type === 1) {
        return Number(value) * 1000;
    } else {
        return Number(value) / 1000;
    }
}
