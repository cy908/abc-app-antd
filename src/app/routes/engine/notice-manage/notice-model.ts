import { PageInfo, LogInfo } from '../engine-model';

/** 通知 */
export class Notice implements PageInfo {

    constructor(
        public id?: number,
        public title?: string,
        public content?: string,
        public startTime?: string,
        public endTime?: string,
        public createTime?: string,
        public updateTime?: string,
        // 扩展
        public pageIndex?: number,
        public pageSize?: number,
        public departments?: NoticeDepartment[],
        // 参数
        public departmentId?: number,
        public search?: string,
    ) { }

}

/** 通知部门 */
export class NoticeDepartment {

    constructor(
        public noticeId?: number,
        public departmentId?: number
    ) { }

}

/** 通知日志 */
export class NoticeLog implements LogInfo, PageInfo {

    constructor(
        public logId?: number,
        public logType?: string,
        public logTime?: string,
        public logUser?: string,
        public notice?: Notice,
        // 扩展
        public pageIndex?: number,
        public pageSize?: number,
    ) { }

}