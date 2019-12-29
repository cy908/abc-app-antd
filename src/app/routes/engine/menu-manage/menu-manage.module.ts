import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared';
import { MenuManageRoutingModule } from './menu-manage-routing.module';
import { MenuManageListComponent } from './menu-manage-list/menu-manage-list.component';
import { MenuManageInfoComponent } from './menu-manage-info/menu-manage-info.component';
import { MenuManageAddComponent } from './menu-manage-add/menu-manage-add.component';
import { MenuManageEditComponent } from './menu-manage-edit/menu-manage-edit.component';

@NgModule({
  declarations: [
    MenuManageListComponent,
    MenuManageInfoComponent,
    MenuManageAddComponent,
    MenuManageEditComponent,
  ],
  imports: [
    SharedModule,
    MenuManageRoutingModule,
  ]
})
export class MenuManageModule { }
