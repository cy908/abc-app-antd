import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'dict-manage', loadChildren: () => import('./dict-manage/dict-manage.module').then(m => m.DictManageModule) },
  { path: 'dpt-manage', loadChildren: () => import('./department-manage/department-manage.module').then(m => m.DepartmentManageModule) },
  { path: 'user-manage', loadChildren: () => import('./user-manage/user-manage.module').then(m => m.UserManageModule) },
  { path: 'menu-manage', loadChildren: () => import('./menu-manage/menu-manage.module').then(m => m.MenuManageModule) },
  { path: 'role-manage', loadChildren: () => import('./role-manage/role-manage.module').then(m => m.RoleManageModule) },
  { path: 'notice-manage', loadChildren: () => import('./notice-manage/notice-manage.module').then(m => m.NoticeManageModule) },
  { path: 'notice-log', loadChildren: () => import('./notice-log/notice-log.module').then(m => m.NoticeLogModule) },
  { path: 'notice', loadChildren: () => import('./notice/notice.module').then(m => m.NoticeModule) },
  { path: 'access-log', loadChildren: () => import('./access-log/access-log.module').then(m => m.AccessLogModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngineRoutingModule { }
