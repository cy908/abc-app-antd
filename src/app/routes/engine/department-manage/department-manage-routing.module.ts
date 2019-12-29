import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentManageListComponent } from './department-manage-list/department-manage-list.component';
import { DepartmentManageInfoComponent } from './department-manage-info/department-manage-info.component';
import { DepartmentManageAddComponent } from './department-manage-add/department-manage-add.component';
import { DepartmentManageEditComponent } from './department-manage-edit/department-manage-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: DepartmentManageListComponent },
  { path: 'info/:id', component: DepartmentManageInfoComponent },
  { path: 'add/:id', component: DepartmentManageAddComponent },
  { path: 'edit/:id', component: DepartmentManageEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentManageRoutingModule { }
