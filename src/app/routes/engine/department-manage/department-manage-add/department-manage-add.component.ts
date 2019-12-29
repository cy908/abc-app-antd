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
  selector: 'app-department-manage-add',
  templateUrl: './department-manage-add.component.html',
  styleUrls: ['./department-manage-add.component.less']
})
export class DepartmentManageAddComponent implements OnInit {

  form: FormGroup;
  loading = false;
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
    this.parentId = +this.route.snapshot.paramMap.get('id');
    if (this.parentId > 0) {
      this.getParentDepartment();
    }
  }

  private initForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(50)]],
      code: [null, [Validators.maxLength(50)]],
      phone: [null, [Validators.maxLength(50)]],
      address: [null, [Validators.maxLength(50)]],
      enable: [true, []],
      note: [null, [Validators.maxLength(100)]],
      keepOn: [true, []],
    });
  }

  private get keepOn(): boolean {
    return this.form.controls.keepOn.value;
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

  private saveDepartment() {
    let department = this.getForm();
    department.parentId = this.parentId;
    const url = DepartmentManageUrl.URL_DEPARTMENT_ADD;
    this.loading = true;
    this.http.post<ResultData<any>>(url, department)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        if (data.success) {
          this.messageSrv.success('保存成功！');
          if (!this.keepOn) {
            this.goBack();
          }
        } else if (data.message) {
          this.messageSrv.error(data.message);
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
