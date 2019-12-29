/**
 * 1、1分钟内显示刚刚
 * 2、1小时内显示X分钟前
 * 3、24小时内显示X小时前
 * 4、1月内显示X天前
 * 5、1年内显示MM月dd日
 * 6、其余显示yyyy年MM月dd日
 */
export function formatTime(date: Date) {
    if (!date) return null;

    const MINUTE = 60 * 1000;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;
    const MONTH = DAY * 30;
    const YEAR = MONTH * 12;

    const start = date.getTime();
    const end = Date.now();
    const ms = end - start;
    if (ms < MINUTE) {
        return '刚刚';
    } else if (ms < HOUR) {
        const m = Math.floor(ms / MINUTE);
        return `${m}分钟前`;
    } else if (ms < DAY) {
        const h = Math.floor(ms / HOUR);
        return `${h}小时前`;
    } else if (ms < MONTH) {
        const d = Math.floor(ms / DAY);
        return `${d}天前`;
    } else if (ms < YEAR) {
        const m = date.getMonth() + 1;
        const d = date.getDate();
        return `${m}月${d}日`;
    } else {
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();
        return `${y}年${m}月${d}日`;
    }
}