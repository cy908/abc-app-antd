import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EngineUrl } from 'src/app/routes/engine';
import { ConfigService } from '../config';

@Injectable()
export class HttpUrlInterceptor implements HttpInterceptor {

    constructor(
        private configSrv: ConfigService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = req.url;
        if (url.endsWith(EngineUrl.URL_CONFIG)) {
            return next.handle(req);
        }
        if (url.startsWith('http') || url.startsWith('//')) {
            return next.handle(req);
        }
        const serverUrl = this.configSrv.getConfig().serverUrl;
        let _url: string;
        if (serverUrl.endsWith('/') && url.startsWith('/')) {
            _url = `${serverUrl}${url.substr(1)}`;
        } else if (serverUrl.endsWith('/') || url.startsWith('/')) {
            _url = `${serverUrl}${url}`;
        } else {
            _url = `${serverUrl}/${url}`;
        }
        const _req = req.clone({ url: _url });
        return next.handle(_req);
    }
}