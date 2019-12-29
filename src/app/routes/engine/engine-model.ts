/** 树形信息 */
export interface TreeInfo {
    orderTopSize?: number,
    orderChildSize?: number,
}

/** 分页信息 */
export interface PageInfo {
    pageIndex?: number,
    pageSize?: number,
}

/** 分页数据 */
export class PageData<T> {

    constructor(
        public data?: T[],
        public count?: number,
    ) { }

}

/** 结果数据 */
export class ResultData<T> {

    constructor(
        public success?: boolean,
        public message?: string,
        public data?: T,
    ) { }

}

/** 日志信息 */
export interface LogInfo {
    logId?: number,
    logType?: string,
    logTime?: string,
    logUser?: string,
}