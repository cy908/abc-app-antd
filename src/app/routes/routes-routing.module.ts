import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TokenGuard } from 'src/app/core/token';
import { LayoutDefaultComponent } from '../layout';
import { LoginComponent } from './login';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [TokenGuard],
    canActivateChild: [TokenGuard],
    children: [
      { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
      { path: 'engine', loadChildren: () => import('./engine/engine.module').then(m => m.EngineModule) },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'exception/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
