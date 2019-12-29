import { EngineUrl } from '../engine-url';

/** 角色管理URL */
export class RoleManageUrl {

    static URL_ROLE = EngineUrl.URL_ENGINE + '/role-manage';

    static URL_ROLE_LIST = RoleManageUrl.URL_ROLE + '/list';
    static URL_ROLE_INFO = RoleManageUrl.URL_ROLE + '/info';
    static URL_ROLE_ADD = RoleManageUrl.URL_ROLE + '/add';
    static URL_ROLE_EDIT = RoleManageUrl.URL_ROLE + '/edit';
    static URL_ROLE_DELETE = RoleManageUrl.URL_ROLE + '/delete';
    static URL_ROLE_MENUS = RoleManageUrl.URL_ROLE + '/menus';
    static URL_ROLE_DEPARTMENTS = RoleManageUrl.URL_ROLE + '/dpts';
    static URL_ROLE_USERS = RoleManageUrl.URL_ROLE + '/users';
    static URL_ROLE_MENUS_SAVE = RoleManageUrl.URL_ROLE + '/menus/save';
    static URL_ROLE_USERS_SAVE = RoleManageUrl.URL_ROLE + '/users/save';

}