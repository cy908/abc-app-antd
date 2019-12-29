import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared';
import { UserManageRoutingModule } from './user-manage-routing.module';
import { UserManageListComponent } from './user-manage-list/user-manage-list.component';
import { UserManageInfoComponent } from './user-manage-info/user-manage-info.component';
import { UserManageAddComponent } from './user-manage-add/user-manage-add.component';
import { UserManageEditComponent } from './user-manage-edit/user-manage-edit.component';

@NgModule({
  declarations: [
    UserManageListComponent,
    UserManageInfoComponent,
    UserManageAddComponent,
    UserManageEditComponent,
  ],
  imports: [
    SharedModule,
    UserManageRoutingModule,
  ]
})
export class UserManageModule { }
