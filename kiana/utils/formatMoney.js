/**
 * Created by easterCat on 2019/4/6.
 */


/**
 * 将金额转英文计算样式
 * @param money 需要格式的money
 * @param place 保留几位小数
 */
export function formatMoney(money, place) {
    money = String(money);
    var add = money.indexOf("+") !== -1 ? "+" : undefined;
    var minus = money.indexOf("-") !== -1 ? "-" : undefined;

    if (add || minus) {
        money = money.slice(1);
    }

    if (!place) {
        place = 2;
    }

    momey = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(Number(place)) + "";

    var money_arr = money.split(".");
    var left = money_arr[0].split("").reverse();
    var right = money_arr[1];
    var result = "";

    for (var i = 0; i < left.length; i++) {
        result += left[i] + ((i + 1) % 3 === 0 && (i + 1) !== left.length ? "," : "");
    }

    result = result.split("").reverse().join("") + "." + right;

    if (result[0] === ",") result = result.replace(',', '');

    if (add) {
        return add + result;
    }

    if (minus) {
        return minus + result;
    }

    return result;
}
