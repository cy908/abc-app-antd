import { EngineUrl } from '../engine-url';

/** 通知URL */
export class NoticeUrl {

    static URL_NOTICE = EngineUrl.URL_ENGINE + '/notice';

    static URL_NOTICE_COUNT = NoticeUrl.URL_NOTICE + '/count';
    static URL_NOTICE_LIST = NoticeUrl.URL_NOTICE + '/list';
    static URL_NOTICE_INFO = NoticeUrl.URL_NOTICE + '/info';

}