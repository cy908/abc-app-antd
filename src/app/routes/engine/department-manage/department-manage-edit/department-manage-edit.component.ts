import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

import { ResultData } from '../../engine-model';
import { DepartmentManageUrl } from '../department-manage-url';
import { Department } from '../department-model';

@Component({
  selector: 'app-department-manage-edit',
  templateUrl: './department-manage-edit.component.html',
  styleUrls: ['./department-manage-edit.component.less']
})
export class DepartmentManageEditComponent implements OnInit {

  form: FormGroup;
  loading = false;
  departmentId = 0;
  department: Department = null;
  parentId = 0;
  parentDepartment: Department = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private messageSrv: NzMessageService,
  ) { }

  ngOnInit() {
    this.initForm();
    this.departmentId = +this.route.snapshot.paramMap.get('id');
    this.getDepartment();
  }

  private initForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(50)]],
      code: [null, [Validators.maxLength(50)]],
      phone: [null, [Validators.maxLength(50)]],
      address: [null, [Validators.maxLength(50)]],
      enable: [true, []],
      note: [null, [Validators.maxLength(100)]],
    });
  }

  submitForm(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    });
    if (this.form.invalid) return;
    this.saveDepartment();
  }

  private getForm() {
    let department = new Department();
    let controls = this.form.controls;
    department.name = controls.name.value;
    department.code = controls.code.value;
    department.phone = controls.phone.value;
    department.address = controls.address.value;
    department.enable = controls.enable.value;
    department.note = controls.note.value;
    return department;
  }

  private setForm() {
    let controls = this.form.controls;
    controls.name.setValue(this.department.name);
    controls.code.setValue(this.department.code);
    controls.phone.setValue(this.department.phone);
    controls.address.setValue(this.department.address);
    controls.enable.setValue(this.department.enable);
    controls.note.setValue(this.department.note);
  }

  private saveDepartment() {
    let department = this.getForm();
    department.id = this.departmentId;
    department.parentId = this.parentId;
    const url = DepartmentManageUrl.URL_DEPARTMENT_EDIT;
    this.loading = true;
    this.http.post<ResultData<any>>(url, department)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        if (data.success) {
          this.messageSrv.success('保存成功！');
          this.goBack();
        } else if (data.message) {
          this.messageSrv.error(data.message);
        }
      });
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
        this.setForm();
        this.parentId = this.department.parentId;
        if (this.parentId > 0) {
          this.getParentDepartment();
        }
      });
  }

  private getParentDepartment() {
    let department = new Department();
    department.id = this.parentId;
    const url = DepartmentManageUrl.URL_DEPARTMENT_INFO;
    this.loading = true;
    this.http.post<Department>(url, department)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.parentDepartment = data;
      });
  }

  goBack() {
    history.back();
  }

}
