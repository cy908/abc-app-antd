import { PageInfo } from '../engine-model';

/** 角色 */
export class Role implements PageInfo {

    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public order?: number,
        public enable?: boolean,
        public note?: string,
        // 扩展
        public pageIndex?: number,
        public pageSize?: number,
        // 参数
        public search?: string,
    ) { }

}

export class RoleMenu {

    constructor(
        public roleId?: number,
        public menuId?: number
    ) { }

}

export class RoleUser {

    constructor(
        public roleId?: number,
        public userId?: number,
    ) { }

}