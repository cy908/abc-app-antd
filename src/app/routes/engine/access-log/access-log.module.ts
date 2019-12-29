import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared';
import { AccessLogRoutingModule } from './access-log-routing.module';
import { AccessLogListComponent } from './access-log-list/access-log-list.component';
import { AccessLogInfoComponent } from './access-log-info/access-log-info.component';
import { AccessLogStatComponent } from './access-log-stat/access-log-stat.component';
import { StatByTypeComponent } from './access-log-stat/stat-by-type/stat-by-type.component';

@NgModule({
  declarations: [
    AccessLogListComponent,
    AccessLogInfoComponent,
    AccessLogStatComponent,
    StatByTypeComponent,
  ],
  imports: [
    SharedModule,
    AccessLogRoutingModule,
  ]
})
export class AccessLogModule { }
