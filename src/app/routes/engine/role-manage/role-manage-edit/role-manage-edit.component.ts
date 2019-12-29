import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

import { ResultData } from '../../engine-model';
import { RoleManageUrl } from '../role-manage-url';
import { Role } from '../role-model';

@Component({
  selector: 'app-role-manage-edit',
  templateUrl: './role-manage-edit.component.html',
  styleUrls: ['./role-manage-edit.component.less']
})
export class RoleManageEditComponent implements OnInit {

  form: FormGroup;
  loading = false;
  roleId = 0;
  role: Role = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private messageSrv: NzMessageService,
  ) { }

  ngOnInit() {
    this.initForm();
    this.roleId = +this.route.snapshot.paramMap.get('id');
    this.getRole();
  }

  private initForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(50)]],
      code: [null, [Validators.required, Validators.maxLength(50)]],
      order: [null, [Validators.required, Validators.maxLength(50)]],
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
    this.saveRole();
  }

  private getForm() {
    let role = new Role();
    let controls = this.form.controls;
    role.name = controls.name.value;
    role.code = controls.code.value;
    role.order = controls.order.value;
    role.enable = controls.enable.value;
    role.note = controls.note.value;
    return role;
  }

  private setForm() {
    let controls = this.form.controls;
    controls.name.setValue(this.role.name);
    controls.code.setValue(this.role.code);
    controls.order.setValue(this.role.order);
    controls.enable.setValue(this.role.enable);
    controls.note.setValue(this.role.note);
  }

  private saveRole() {
    let role = this.getForm();
    role.id = this.roleId;
    const url = RoleManageUrl.URL_ROLE_EDIT;
    this.loading = true;
    this.http.post<ResultData<any>>(url, role)
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

  private getRole() {
    let role = new Role();
    role.id = this.roleId;
    const url = RoleManageUrl.URL_ROLE_INFO;
    this.loading = true;
    this.http.post<Role>(url, role)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.role = data;
        this.setForm();
      });
  }

  goBack() {
    history.back();
  }

}
