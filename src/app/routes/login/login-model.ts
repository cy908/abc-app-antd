/** 登录请求 */
export class LoginRequest {

    constructor(
        public username?: string,
        public password?: string,
    ) { }

}

/** 登录响应 */
export class LoginResponse {

    constructor(
        public token?: string,
        public auths?: string[],
    ) { }

}