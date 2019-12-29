import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { RoleManageUrl } from '../role-manage-url';
import { Role } from '../role-model';

@Component({
  selector: 'app-role-manage-info',
  templateUrl: './role-manage-info.component.html',
  styleUrls: ['./role-manage-info.component.less']
})
export class RoleManageInfoComponent implements OnInit {

  loading = false;
  roleId = 0;
  role: Role = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.roleId = +this.route.snapshot.paramMap.get('id');
    this.getRole();
  }

  private getRole() {
    let role = new Role();
    role.id = this.roleId;
    const url = RoleManageUrl.URL_ROLE_INFO;
    this.loading = true;
    this.http.post<Role>(url, role)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.role = data;
      });
  }

  goBack() {
    history.back();
  }

}
