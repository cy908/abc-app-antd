import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared';
import { NoticeLogRoutingModule } from './notice-log-routing.module';
import { NoticeLogListComponent } from './notice-log-list/notice-log-list.component';
import { NoticeLogInfoComponent } from './notice-log-info/notice-log-info.component';

@NgModule({
  declarations: [
    NoticeLogListComponent,
    NoticeLogInfoComponent,
  ],
  imports: [
    SharedModule,
    NoticeLogRoutingModule,
  ]
})
export class NoticeLogModule { }
