import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { LayoutDefaultComponent } from './layout-default';
import { LayoutFullscreenComponent } from './layout-fullscreen';

@NgModule({
  declarations: [
    LayoutDefaultComponent,
    LayoutFullscreenComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    LayoutDefaultComponent,
    LayoutFullscreenComponent,
  ]
})
export class LayoutModule { }
