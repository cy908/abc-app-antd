import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

import { STARTUP_PROVIDES } from './core/config';
import { HTTP_PROVIDERS } from './core/http';

import { AppComponent } from './app.component';
import { SharedModule } from './shared';
import { RoutesModule } from './routes';
import { LayoutModule } from './layout';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    RoutesModule,
    LayoutModule,
  ],
  providers: [
    ...STARTUP_PROVIDES,
    ...HTTP_PROVIDERS,
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
