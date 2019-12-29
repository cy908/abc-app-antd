import { EngineUrl } from '../engine-url';

/** 访问日志URL */
export class AccessLogUrl {

    static URL_ACCESS_LOG = EngineUrl.URL_ENGINE + '/access-log';

    static URL_ACCESS_LOG_LIST = AccessLogUrl.URL_ACCESS_LOG + '/list';
    static URL_ACCESS_LOG_INFO = AccessLogUrl.URL_ACCESS_LOG + '/info';
    static URL_ACCESS_LOG_STAT = AccessLogUrl.URL_ACCESS_LOG + '/stat';

}