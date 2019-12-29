import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticeManageListComponent } from './notice-manage-list/notice-manage-list.component';
import { NoticeManageInfoComponent } from './notice-manage-info/notice-manage-info.component';
import { NoticeManageAddComponent } from './notice-manage-add/notice-manage-add.component';
import { NoticeManageEditComponent } from './notice-manage-edit/notice-manage-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: NoticeManageListComponent },
  { path: 'info/:id', component: NoticeManageInfoComponent },
  { path: 'add', component: NoticeManageAddComponent },
  { path: 'edit/:id', component: NoticeManageEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticeManageRoutingModule { }
