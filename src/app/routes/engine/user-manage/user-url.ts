import { EngineUrl } from '../engine-url';

/** 用户URL */
export class UserUrl {

    static URL_USER = EngineUrl.URL_ENGINE + '/user';

    static URL_USER_INFO = UserUrl.URL_USER + '/info';
    static URL_USER_EDIT_PASSWORD = UserUrl.URL_USER + '/editpwd';

}