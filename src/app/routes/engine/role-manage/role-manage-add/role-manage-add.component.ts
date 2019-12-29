import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

import { ResultData } from '../../engine-model';
import { RoleManageUrl } from '../role-manage-url';
import { Role } from '../role-model';

@Component({
  selector: 'app-role-manage-add',
  templateUrl: './role-manage-add.component.html',
  styleUrls: ['./role-manage-add.component.less']
})
export class RoleManageAddComponent implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private messageSrv: NzMessageService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(50)]],
      code: [null, [Validators.required, Validators.maxLength(50)]],
      order: [null, [Validators.required, Validators.maxLength(50)]],
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

  private saveRole() {
    let role = this.getForm();
    const url = RoleManageUrl.URL_ROLE_ADD;
    this.loading = true;
    this.http.post<ResultData<any>>(url, role)
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

  goBack() {
    history.back();
  }

}
