import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticeListComponent } from './notice-list/notice-list.component';
import { NoticeInfoComponent } from './notice-info/notice-info.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: NoticeListComponent },
  { path: 'info/:id', component: NoticeInfoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticeRoutingModule { }
