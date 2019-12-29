import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { EngineUrl } from 'src/app/routes/engine';
import { LoginUrl } from 'src/app/routes/login';
import { TokenService } from '../token';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

    constructor(
        private tokenSrv: TokenService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let auth = true;
        if (req.url.endsWith(EngineUrl.URL_CONFIG)) {
            auth = false;
        } else if (req.url.endsWith(LoginUrl.URL_LOGIN)) {
            auth = false;
        }
        let _req = req;
        if (auth) {
            const token = this.tokenSrv.getToken();
            if (token) {
                _req = req.clone({
                    setHeaders: { 'X-Token': token },
                });
            }
        }
        return next.handle(_req).pipe(tap(event => {
            if (event instanceof HttpResponse) {
                const _token = event.headers.get('X-Token');
                if (_token) {
                    this.tokenSrv.setToken(_token);
                }
            }
        }));
    }
}