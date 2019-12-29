import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticeLogListComponent } from './notice-log-list/notice-log-list.component';
import { NoticeLogInfoComponent } from './notice-log-info/notice-log-info.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', redirectTo: 'list/0', pathMatch: 'full' },
  { path: 'list/:id', component: NoticeLogListComponent },
  { path: 'info/:id', component: NoticeLogInfoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticeLogRoutingModule { }
