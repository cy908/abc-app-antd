/** 菜单数据 */
export class MenuData {

    constructor(
        public id: number,
        public name: string,
        public url?: string,
        public antdIcon?: string,
        public antdIconTheme?: string,
        public antdIconTwotone?: string,
        public children?: MenuData[]
    ) { }

}