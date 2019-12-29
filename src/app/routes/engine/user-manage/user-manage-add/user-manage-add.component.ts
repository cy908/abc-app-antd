import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

import { ResultData } from '../../engine-model';
import { Department } from '../../department-manage';
import { UserManageUrl } from '../user-manage-url';
import { User } from '../user-model';

@Component({
  selector: 'app-user-manage-add',
  templateUrl: './user-manage-add.component.html',
  styleUrls: ['./user-manage-add.component.less']
})
export class UserManageAddComponent implements OnInit {

  form: FormGroup;
  loading = false;
  departments: Department[] = null;
  departmentLoading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private messageSrv: NzMessageService,
  ) { }

  ngOnInit() {
    this.initForm();
    this.getDepartments();
  }

  private initForm() {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.maxLength(50)]],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      departmentId: [null, [Validators.required]],
      code: [null, [Validators.maxLength(50)]],
      title: [null, [Validators.maxLength(50)]],
      card: [null, [Validators.pattern(/^\d{17}[\d|X]$/)]],
      gender: [null, []],
      birthday: [null, []],
      phone: [null, [Validators.maxLength(50)]],
      email: [null, [Validators.email, Validators.maxLength(50)]],
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
    this.saveUser();
  }

  private getForm() {
    let user = new User();
    let controls = this.form.controls;
    user.username = controls.username.value;
    user.name = controls.name.value;
    user.departmentId = controls.departmentId.value;
    user.code = controls.code.value;
    user.title = controls.title.value;
    user.card = controls.card.value;
    user.gender = controls.gender.value;
    const birthday: Date = controls.birthday.value;
    if (!!birthday) {
      // 去掉时间部分
      birthday.setHours(0, 0, 0, 0);
      user.birthday = birthday.toISOString();
    } else {
      user.birthday = null;
    }
    user.phone = controls.phone.value;
    user.email = controls.email.value;
    user.address = controls.address.value;
    user.enable = controls.enable.value;
    user.note = controls.note.value;
    return user;
  }

  private saveUser() {
    let user = this.getForm();
    const url = UserManageUrl.URL_USER_ADD;
    this.loading = true;
    this.http.post<ResultData<any>>(url, user)
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

  private getDepartments() {
    const url = UserManageUrl.URL_USER_DEPARTMENTS;
    this.departmentLoading = true;
    this.http.get<Department[]>(url)
      .pipe(tap(() => this.departmentLoading = false, () => this.departmentLoading = false))
      .subscribe(data => {
        this.departments = data;
      });
  }

  goBack() {
    history.back();
  }

}
