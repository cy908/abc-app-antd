import { PageInfo } from '../engine-model';
import { Department } from '../department-manage';

/** 用户 */
export class User implements PageInfo {

    constructor(
        public id?: number,
        public departmentId?: number,
        public username?: string,
        public password?: string,
        public name?: string,
        public code?: string,
        public title?: string,
        public card?: string,
        public gender?: number,
        public birthday?: string,
        public phone?: string,
        public email?: string,
        public address?: string,
        public createTime?: string,
        public updateTime?: string,
        public enable?: boolean,
        public note?: string,
        // 扩展
        public pageIndex?: number,
        public pageSize?: number,
        public department?: Department,
        public check?: boolean,
        // 参数
        public search?: string,
    ) { }

}

/** 密码 */
export class Password {

    constructor(
        public id?: number,
        public ids?: number[],
        public old?: string,
        public now?: string,
    ) { }

}