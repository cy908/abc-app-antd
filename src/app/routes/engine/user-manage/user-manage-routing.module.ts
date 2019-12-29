import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserManageListComponent } from './user-manage-list/user-manage-list.component';
import { UserManageInfoComponent } from './user-manage-info/user-manage-info.component';
import { UserManageAddComponent } from './user-manage-add/user-manage-add.component';
import { UserManageEditComponent } from './user-manage-edit/user-manage-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: UserManageListComponent },
  { path: 'info/:id', component: UserManageInfoComponent },
  { path: 'add', component: UserManageAddComponent },
  { path: 'edit/:id', component: UserManageEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManageRoutingModule { }
