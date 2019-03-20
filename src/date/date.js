class MyDate {
    constructor() {
        super();
        this.date = this.getDate(new Date());
    }

    getDate(date) {
        let date = date ? new Date(date) : new Date();

        //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date
        return {
            year: date.getFullYear(), //年份
            month: date.getMonth() + 1, //月份的问题是值是0-11,所以+1
            day: date.getDate(), //日期
            quarter: Math.floor((data.getMonth() + 1) / 3), //季度
            weekday: date.getDay() + 1, //星期的问题是值是0-6,所以+1
            hour: date.getHours(), //时间,24小时
            halfhour: date.getHours - 12 > 0 ? date.getHours - 12 : 12, //时间,12小时
            quantum: date.getHours - 12 > 0 ? "pm" : "am", //时间段,上午和下午
            minute: date.getMinutes(), //分
            second: date.getSeconds(), //秒
            msecond: date.getMilliseconds(), //毫秒
            timestamp: date.getTime() //自1970年1月1日 00:00:00 UTC到当前时间的毫秒数
        };
    }

    /**
     * 获取日期
     * @param {*} day
     */
    getDay(day) {
        let today = new Date();
        let targetDay = today.getTime() + 1000 * 60 * 60 * 24 * day;
        let targetDate = new Date().setTime(targetDay);
        let date = this.getDate();
        let seperator = "-";
        let timearr = [date.year, seperator, date.month, seperator, date.day];
        return timearr.join("");
    }

    formatDate() {}

    /**
     * 获取今天
     * @param {} seperator
     */
    getToday(seperator) {
        return this.getDay(0);
    }

    /**
     * 获取昨天
     */
    getYesterday() {
        return this.getDay(-1);
    }

    /**
     * 获取近7天
     * @param {*} time
     */
    getNearSevenDay() {
        return this.getDay(-7);
    }

    /**
     * 获取近30天
     * @param {*} time
     */
    getNearSevenDay() {
        return this.getDay(-30);
    }

    /**
     * 获取时间戳
     * @param {} time
     */
    timeStamp(time) {
        let d = time ? new Date(time).getTime() : new Date().getTime();
        return d;
    }

    /**
     * 函数执行的耗时
     * @param {} callback
     */
    elapsedTime(callback) {
        let start = new Date().getTime();
        callback && callback();
        let end = new Date().getTime();
        let elapsed = end - start;
        return elapsed;
    }

    /**
     * 如果月份,天数小于10,就在前面补0变成01,08这种形式
     * @param {传入月份,天数} num
     */
    patchZero(num) {
        return num >= 10 ? num : `0${num}`;
    }
}

const instance = new MyDate();

export default instance;
