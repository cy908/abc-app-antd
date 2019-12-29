import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleManageListComponent } from './role-manage-list/role-manage-list.component';
import { RoleManageInfoComponent } from './role-manage-info/role-manage-info.component';
import { RoleManageAddComponent } from './role-manage-add/role-manage-add.component';
import { RoleManageEditComponent } from './role-manage-edit/role-manage-edit.component';
import { RoleManageMenusComponent } from './role-manage-menus/role-manage-menus.component';
import { RoleManageUsersComponent } from './role-manage-users/role-manage-users.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: RoleManageListComponent },
  { path: 'info/:id', component: RoleManageInfoComponent },
  { path: 'add', component: RoleManageAddComponent },
  { path: 'edit/:id', component: RoleManageEditComponent },
  { path: 'menus/:id', component: RoleManageMenusComponent },
  { path: 'users/:id', component: RoleManageUsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleManageRoutingModule { }
