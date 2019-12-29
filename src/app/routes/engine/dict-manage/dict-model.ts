import { PageInfo } from '../engine-model';

/** 字典 */
export class Dict implements PageInfo {

    constructor(
        public id?: number,
        public type?: number,
        public name?: string,
        public order?: string,
        public enable?: boolean,
        public note?: string,
        // 扩展
        public pageIndex?: number,
        public pageSize?: number,
        // 参数
        public oldId?: number,
        public search?: string,
    ) { }

}

/** 字典项 */
export class DictOption implements PageInfo {

    constructor(
        public id?: number,
        public dictId?: number,
        public name?: string,
        public code?: string,
        public order?: string,
        public enable?: boolean,
        public note?: string,
        // 扩展
        public pageIndex?: number,
        public pageSize?: number,
        public dict?: Dict,
        // 参数
        public oldId?: number,
        public search?: string,
    ) { }

}