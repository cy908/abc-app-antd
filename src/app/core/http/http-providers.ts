import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpUrlInterceptor } from './http-url-interceptor';
import { HttpTokenInterceptor } from './http-token-interceptor';
import { HttpErrorInterceptor } from './http-error-interceptor';

export const HTTP_PROVIDERS = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
];