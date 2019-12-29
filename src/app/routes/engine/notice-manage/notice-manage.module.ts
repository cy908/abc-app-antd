import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared';
import { NoticeManageRoutingModule } from './notice-manage-routing.module';
import { NoticeManageListComponent } from './notice-manage-list/notice-manage-list.component';
import { NoticeManageInfoComponent } from './notice-manage-info/notice-manage-info.component';
import { NoticeManageAddComponent } from './notice-manage-add/notice-manage-add.component';
import { NoticeManageEditComponent } from './notice-manage-edit/notice-manage-edit.component';

@NgModule({
  declarations: [
    NoticeManageListComponent,
    NoticeManageInfoComponent,
    NoticeManageAddComponent,
    NoticeManageEditComponent,
  ],
  imports: [
    SharedModule,
    NoticeManageRoutingModule,
  ]
})
export class NoticeManageModule { }
