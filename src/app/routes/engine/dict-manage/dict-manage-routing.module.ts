import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DictManageListComponent } from './dict-manage-list/dict-manage-list.component';
import { DictManageInfoComponent } from './dict-manage-info/dict-manage-info.component';
import { DictManageAddComponent } from './dict-manage-add/dict-manage-add.component';
import { DictManageEditComponent } from './dict-manage-edit/dict-manage-edit.component';
import { DictManageOptionListComponent } from './dict-manage-option-list/dict-manage-option-list.component';
import { DictManageOptionInfoComponent } from './dict-manage-option-info/dict-manage-option-info.component';
import { DictManageOptionAddComponent } from './dict-manage-option-add/dict-manage-option-add.component';
import { DictManageOptionEditComponent } from './dict-manage-option-edit/dict-manage-option-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'list/0', pathMatch: 'full' },
  { path: 'list/:type', component: DictManageListComponent },
  { path: 'info/:id', component: DictManageInfoComponent },
  { path: 'add/:type', component: DictManageAddComponent },
  { path: 'edit/:id', component: DictManageEditComponent },
  {
    path: 'option', children: [
      { path: 'list/:dictId', component: DictManageOptionListComponent },
      { path: 'info/:dictId/:id', component: DictManageOptionInfoComponent },
      { path: 'add/:dictId', component: DictManageOptionAddComponent },
      { path: 'edit/:dictId/:id', component: DictManageOptionEditComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DictManageRoutingModule { }
