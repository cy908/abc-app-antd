import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared';
import { RoleManageRoutingModule } from './role-manage-routing.module';
import { RoleManageListComponent } from './role-manage-list/role-manage-list.component';
import { RoleManageInfoComponent } from './role-manage-info/role-manage-info.component';
import { RoleManageAddComponent } from './role-manage-add/role-manage-add.component';
import { RoleManageEditComponent } from './role-manage-edit/role-manage-edit.component';
import { RoleManageMenusComponent } from './role-manage-menus/role-manage-menus.component';
import { RoleManageUsersComponent } from './role-manage-users/role-manage-users.component';

@NgModule({
  declarations: [
    RoleManageListComponent,
    RoleManageInfoComponent,
    RoleManageAddComponent,
    RoleManageEditComponent,
    RoleManageMenusComponent,
    RoleManageUsersComponent,
  ],
  imports: [
    SharedModule,
    RoleManageRoutingModule,
  ]
})
export class RoleManageModule { }
