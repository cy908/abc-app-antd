import { EngineUrl } from '../engine-url';

/** 通知管理URL */
export class NoticeManageUrl {

    static URL_NOTICE = EngineUrl.URL_ENGINE + '/notice-manage';

    static URL_NOTICE_LIST = NoticeManageUrl.URL_NOTICE + '/list';
    static URL_NOTICE_INFO = NoticeManageUrl.URL_NOTICE + '/info';
    static URL_NOTICE_ADD = NoticeManageUrl.URL_NOTICE + '/add';
    static URL_NOTICE_EDIT = NoticeManageUrl.URL_NOTICE + '/edit';
    static URL_NOTICE_DELETE = NoticeManageUrl.URL_NOTICE + '/delete';
    static URL_NOTICE_DEPARTMENTS = NoticeManageUrl.URL_NOTICE + '/dpts';

}