import { PageInfo, TreeInfo } from '../engine-model';

/** 菜单 */
export class Menu implements PageInfo, TreeInfo {

    constructor(
        public id?: number,
        public parentId?: number,
        public name?: string,
        public url?: string,
        public matIcon?: string,
        public antdIcon?: string,
        public antdIconTheme?: string,
        public antdIconTwotone?: string,
        public order?: string,
        public enable?: boolean,
        public note?: string,
        // 扩展
        public pageIndex?: number,
        public pageSize?: number,
        public orderTopSize?: number,
        public orderChildSize?: number,
        public children?: Menu[],
        public checked?: boolean,
        // 参数
        public search?: string,
    ) { }

}