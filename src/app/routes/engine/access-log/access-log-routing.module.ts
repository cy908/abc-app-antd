import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessLogListComponent } from './access-log-list/access-log-list.component';
import { AccessLogInfoComponent } from './access-log-info/access-log-info.component';
import { AccessLogStatComponent } from './access-log-stat/access-log-stat.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: AccessLogListComponent },
  { path: 'info/:id', component: AccessLogInfoComponent },
  { path: 'stat', component: AccessLogStatComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessLogRoutingModule { }
