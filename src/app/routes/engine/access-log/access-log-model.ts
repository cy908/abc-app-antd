import { PageInfo } from '../engine-model';

/** 访问日志 */
export class AccessLog implements PageInfo {

    constructor(
        public id?: number,
        public accessIP?: string,
        public accessUrl?: string,
        public accessUser?: string,
        public accessTime?: string,
        // 扩展
        public pageIndex?: number,
        public pageSize?: number,
        // 参数
        public search?: string,
        public startTime?: string,
        public endTime?: string,
    ) { }

}

/** 访问日志统计 */
export class AccessLogStat {

    constructor(
        public accessPV?: number,
        public accessIP?: number,
        public accessTime?: string,
        // 参数
        public statType?: string,
        public startTime?: string,
        public endTime?: string,
    ) { }

}

/** 访问日志统计类型 */
export class AccessLogStatType {

    static ByYear = 'byYear';

}
