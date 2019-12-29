import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { DepartmentManageUrl } from '../department-manage-url';
import { Department } from '../department-model';

@Component({
  selector: 'app-department-manage-info',
  templateUrl: './department-manage-info.component.html',
  styleUrls: ['./department-manage-info.component.less']
})
export class DepartmentManageInfoComponent implements OnInit {

  loading = false;
  departmentId = 0;
  department: Department = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.departmentId = +this.route.snapshot.paramMap.get('id');
    this.getDepartment();
  }

  private getDepartment() {
    let department = new Department();
    department.id = this.departmentId;
    const url = DepartmentManageUrl.URL_DEPARTMENT_INFO;
    this.loading = true;
    this.http.post<Department>(url, department)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.department = data;
      });
  }

  goBack() {
    history.back();
  }

}
