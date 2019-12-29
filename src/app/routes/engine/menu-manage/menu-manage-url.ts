import { EngineUrl } from '../engine-url';

/** 菜单管理URL */
export class MenuManageUrl {

    static URL_MENU = EngineUrl.URL_ENGINE + '/menu-manage';

    static URL_MENU_LIST = MenuManageUrl.URL_MENU + '/list';
    static URL_MENU_INFO = MenuManageUrl.URL_MENU + '/info';
    static URL_MENU_ADD = MenuManageUrl.URL_MENU + '/add';
    static URL_MENU_EDIT = MenuManageUrl.URL_MENU + '/edit';
    static URL_MENU_DELETE = MenuManageUrl.URL_MENU + '/delete';

}