import { EngineUrl } from '../engine-url';

/** 部门管理URL */
export class DepartmentManageUrl {

    static URL_DEPARTMENT = EngineUrl.URL_ENGINE + '/dpt-manage';

    static URL_DEPARTMENT_LIST = DepartmentManageUrl.URL_DEPARTMENT + '/list';
    static URL_DEPARTMENT_INFO = DepartmentManageUrl.URL_DEPARTMENT + '/info';
    static URL_DEPARTMENT_ADD = DepartmentManageUrl.URL_DEPARTMENT + '/add';
    static URL_DEPARTMENT_EDIT = DepartmentManageUrl.URL_DEPARTMENT + '/edit';
    static URL_DEPARTMENT_DELETE = DepartmentManageUrl.URL_DEPARTMENT + '/delete';

}