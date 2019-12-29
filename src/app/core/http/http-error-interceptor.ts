import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import { EngineUrl } from 'src/app/routes/engine';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private messageSrv: NzMessageService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(tap(() => { }, error => {
            this.processError(error);
        }));
    }

    /** 处理错误 */
    private processError(error: any) {
        let message: string;
        const url: string = error.url;
        const code: number = error.status;
        if (code == 401) {
            if (url.endsWith('login')) {
                message = '用户名或密码错误！';
            } else {
                message = '未登录或登录已过期，请重新登录！';
                this.toLogin();
            }
        } else if (code === 403) {
            message = '请求失败，请求地址未授权！';
        } else if (code === 404) {
            message = '请求失败，未找到请求地址！';
        } else if (code === 500) {
            message = '请求失败，服务器出错！';
        } else {
            message = '未知错误，请检查网络！';
        }
        this.messageSrv.error(message);
    }

    private toLogin() {
        this.router.navigate([EngineUrl.URL_LOGIN]);
    }
}