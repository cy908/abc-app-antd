import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { SharedModule } from 'src/app/shared';
import { NoticeRoutingModule } from './notice-routing.module';
import { NoticeListComponent } from './notice-list/notice-list.component';
import { NoticeInfoComponent } from './notice-info/notice-info.component';

@NgModule({
  declarations: [
    NoticeListComponent,
    NoticeInfoComponent,
  ],
  imports: [
    SharedModule,
    CKEditorModule,
    NoticeRoutingModule,
  ]
})
export class NoticeModule { }
