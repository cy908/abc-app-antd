import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared';
import { DictManageRoutingModule } from './dict-manage-routing.module';
import { DictManageListComponent } from './dict-manage-list/dict-manage-list.component';
import { DictManageInfoComponent } from './dict-manage-info/dict-manage-info.component';
import { DictManageAddComponent } from './dict-manage-add/dict-manage-add.component';
import { DictManageEditComponent } from './dict-manage-edit/dict-manage-edit.component';
import { DictManageOptionListComponent } from './dict-manage-option-list/dict-manage-option-list.component';
import { DictManageOptionInfoComponent } from './dict-manage-option-info/dict-manage-option-info.component';
import { DictManageOptionAddComponent } from './dict-manage-option-add/dict-manage-option-add.component';
import { DictManageOptionEditComponent } from './dict-manage-option-edit/dict-manage-option-edit.component';

@NgModule({
  declarations: [
    DictManageListComponent,
    DictManageInfoComponent,
    DictManageAddComponent,
    DictManageEditComponent,
    DictManageOptionListComponent,
    DictManageOptionInfoComponent,
    DictManageOptionAddComponent,
    DictManageOptionEditComponent,
  ],
  imports: [
    SharedModule,
    DictManageRoutingModule,
  ]
})
export class DictManageModule { }
