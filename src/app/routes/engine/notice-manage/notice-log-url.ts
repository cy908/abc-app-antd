import { EngineUrl } from '../engine-url';

/** 通知日志URL */
export class NoticeLogUrl {

    static URL_NOTICE = EngineUrl.URL_ENGINE + '/notice-log';

    static URL_NOTICE_LIST = NoticeLogUrl.URL_NOTICE + '/list';
    static URL_NOTICE_INFO = NoticeLogUrl.URL_NOTICE + '/info';
    static URL_NOTICE_DEPARTMENTS = NoticeLogUrl.URL_NOTICE + '/dpts';

}