import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared';
import { DepartmentManageRoutingModule } from './department-manage-routing.module';
import { DepartmentManageListComponent } from './department-manage-list/department-manage-list.component';
import { DepartmentManageInfoComponent } from './department-manage-info/department-manage-info.component';
import { DepartmentManageAddComponent } from './department-manage-add/department-manage-add.component';
import { DepartmentManageEditComponent } from './department-manage-edit/department-manage-edit.component';

@NgModule({
  declarations: [
    DepartmentManageListComponent,
    DepartmentManageInfoComponent,
    DepartmentManageAddComponent,
    DepartmentManageEditComponent,
  ],
  imports: [
    SharedModule,
    DepartmentManageRoutingModule,
  ]
})
export class DepartmentManageModule { }
