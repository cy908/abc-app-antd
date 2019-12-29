import { EngineUrl } from '../engine-url';

/** 用户管理URL */
export class UserManageUrl {

    static URL_USER = EngineUrl.URL_ENGINE + '/user-manage';

    static URL_USER_LIST = UserManageUrl.URL_USER + '/list';
    static URL_USER_INFO = UserManageUrl.URL_USER + '/info';
    static URL_USER_ADD = UserManageUrl.URL_USER + '/add';
    static URL_USER_EDIT = UserManageUrl.URL_USER + '/edit';
    static URL_USER_DELETE = UserManageUrl.URL_USER + '/delete';
    static URL_USER_DEPARTMENTS = UserManageUrl.URL_USER + '/dpts';
    static URL_USER_RESET_PASSWORD = UserManageUrl.URL_USER + '/resetpwd';

}