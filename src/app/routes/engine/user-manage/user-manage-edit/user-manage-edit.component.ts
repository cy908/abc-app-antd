import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

import { ResultData } from '../../engine-model';
import { Department } from '../../department-manage';
import { UserManageUrl } from '../user-manage-url';
import { User } from '../user-model';

@Component({
  selector: 'app-user-manage-edit',
  templateUrl: './user-manage-edit.component.html',
  styleUrls: ['./user-manage-edit.component.less']
})
export class UserManageEditComponent implements OnInit {

  form: FormGroup;
  loading = false;
  userId = 0;
  user: User = null;
  departments: Department[] = null;
  departmentLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageSrv: NzMessageService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.initForm();
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.getUser();
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
    });
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

  private setForm() {
    let controls = this.form.controls;
    controls.username.setValue(this.user.username);
    controls.name.setValue(this.user.name);
    controls.departmentId.setValue(this.user.departmentId);
    controls.code.setValue(this.user.code);
    controls.title.setValue(this.user.title);
    controls.card.setValue(this.user.card);
    controls.gender.setValue(this.user.gender);
    const birthday = this.user.birthday;
    if (!!birthday) {
      controls.birthday.setValue(new Date(birthday));
    } else {
      controls.birthday.setValue(null);
    }
    controls.phone.setValue(this.user.phone);
    controls.email.setValue(this.user.email);
    controls.address.setValue(this.user.address);
    controls.enable.setValue(this.user.enable);
    controls.note.setValue(this.user.note);
  }

  private saveUser() {
    let user = this.getForm();
    user.id = this.userId;
    const url = UserManageUrl.URL_USER_EDIT;
    this.loading = true;
    this.http.post<ResultData<any>>(url, user)
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

  private getUser() {
    let user = new User();
    user.id = this.userId;
    const url = UserManageUrl.URL_USER_INFO;
    this.loading = true;
    this.http.post<User>(url, user)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.user = data;
        this.setForm();
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
