import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { RoutesRoutingModule } from './routes-routing.module';
import { LoginComponent } from './login';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    SharedModule,
    RoutesRoutingModule,
  ]
})
export class RoutesModule { }
