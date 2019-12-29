import { EngineUrl } from '../engine-url';

/** 字典管理URL */
export class DictManageUrl {

    static URL_DICT = EngineUrl.URL_ENGINE + '/dict-manage';

    static URL_DICT_LIST = DictManageUrl.URL_DICT + '/list';
    static URL_DICT_INFO = DictManageUrl.URL_DICT + '/info';
    static URL_DICT_ADD = DictManageUrl.URL_DICT + '/add';
    static URL_DICT_EDIT = DictManageUrl.URL_DICT + '/edit';
    static URL_DICT_DELETE = DictManageUrl.URL_DICT + '/delete';
    static URL_DICT_TYPES = DictManageUrl.URL_DICT + '/types';
    static URL_DICT_TYPE = DictManageUrl.URL_DICT + '/type';

    static URL_DICT_OPTION = DictManageUrl.URL_DICT + '/option';

    static URL_DICT_OPTION_LIST = DictManageUrl.URL_DICT_OPTION + '/list';
    static URL_DICT_OPTION_INFO = DictManageUrl.URL_DICT_OPTION + '/info';
    static URL_DICT_OPTION_ADD = DictManageUrl.URL_DICT_OPTION + '/add';
    static URL_DICT_OPTION_EDIT = DictManageUrl.URL_DICT_OPTION + '/edit';
    static URL_DICT_OPTION_DELETE = DictManageUrl.URL_DICT_OPTION + '/delete';

}