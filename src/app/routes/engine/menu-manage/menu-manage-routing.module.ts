import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuManageListComponent } from './menu-manage-list/menu-manage-list.component';
import { MenuManageInfoComponent } from './menu-manage-info/menu-manage-info.component';
import { MenuManageAddComponent } from './menu-manage-add/menu-manage-add.component';
import { MenuManageEditComponent } from './menu-manage-edit/menu-manage-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: MenuManageListComponent },
  { path: 'info/:id', component: MenuManageInfoComponent },
  { path: 'add/:id', component: MenuManageAddComponent },
  { path: 'edit/:id', component: MenuManageEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuManageRoutingModule { }
