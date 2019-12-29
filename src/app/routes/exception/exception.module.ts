import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared';

import { ExceptionRoutingModule } from './exception-routing.module';
import { Exception403Component } from './exception403/exception403.component';
import { Exception404Component } from './exception404/exception404.component';
import { Exception500Component } from './exception500/exception500.component';

@NgModule({
  declarations: [
    Exception403Component,
    Exception404Component,
    Exception500Component,
  ],
  imports: [
    SharedModule,
    ExceptionRoutingModule,
  ]
})
export class ExceptionModule { }
