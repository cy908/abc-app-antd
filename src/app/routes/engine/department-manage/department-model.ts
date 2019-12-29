import { PageInfo, TreeInfo } from '../engine-model';

/** 部门 */
export class Department implements PageInfo, TreeInfo {

    constructor(
        public id?: number,
        public parentId?: number,
        public name?: string,
        public code?: string,
        public phone?: string,
        public address?: string,
        public order?: string,
        public enable?: boolean,
        public note?: string,
        // 扩展
        public pageIndex?: number,
        public pageSize?: number,
        public orderTopSize?: number,
        public orderChildSize?: number,
        public children?: Department[],
        // 参数
        public search?: string,
    ) { }

}