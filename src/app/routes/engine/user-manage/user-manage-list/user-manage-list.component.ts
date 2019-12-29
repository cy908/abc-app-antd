import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

import { EngineConfig } from '../../engine-config';
import { PageData, ResultData } from '../../engine-model';
import { Department } from '../../department-manage';
import { UserManageUrl } from '../user-manage-url';
import { User, Password } from '../user-model';

@Component({
  selector: 'app-user-manage-list',
  templateUrl: './user-manage-list.component.html',
  styleUrls: ['./user-manage-list.component.less']
})
export class UserManageListComponent implements OnInit {

  form: FormGroup;
  pageIndex = 1;
  pageSize = EngineConfig.PAGE_SIZE;
  total = 0;
  listOfData: User[] = [];
  loading = false;
  isAllChecked = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;

  passwordForm: FormGroup;
  passwordLoading = false;
  isPasswordVisible = false;

  departments: Department[] = null;
  departmentLoading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private messageSrv: NzMessageService,
  ) { }

  ngOnInit() {
    this.initForm();
    this.initPasswordForm();
    this.searchData(true);
    this.getDepartments();
  }

  private initForm() {
    this.form = this.fb.group({
      search: [null, [Validators.maxLength(50)]],
      departmentId: [null, []],
    });
  }

  private get search(): string {
    if (this.form.invalid) return null;
    return this.form.controls.search.value;
  }

  private get departmentId(): number {
    if (this.form.invalid) return null;
    return this.form.controls.departmentId.value;
  }

  submitForm(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    });
    if (this.form.invalid) return;
    this.searchData(true);
  }

  searchData(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    let user = new User();
    user.pageIndex = this.pageIndex;
    user.pageSize = this.pageSize;
    user.search = this.search;
    user.departmentId = this.departmentId;
    const url = UserManageUrl.URL_USER_LIST;
    this.loading = true;
    this.http.post<PageData<User>>(url, user)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.listOfData = data.data;
        this.total = data.count;
        this.clearCheck();
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

  goInfo(id: number) {
    this.router.navigate([UserManageUrl.URL_USER_INFO, id]);
  }

  goAdd() {
    this.router.navigate([UserManageUrl.URL_USER_ADD]);
  }

  goEdit(id: number) {
    this.router.navigate([UserManageUrl.URL_USER_EDIT, id]);
  }

  goDelete(id: number) {
    let user = new User();
    user.id = id;
    const url = UserManageUrl.URL_USER_DELETE;
    this.loading = true;
    this.http.post<ResultData<any>>(url, user)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        if (data.success) {
          this.messageSrv.success('删除成功！');
          this.searchData(true);
        } else if (data.message) {
          this.messageSrv.error(data.message);
        }
      });
  }

  refreshStatus(): void {
    if (!this.listOfData) return;
    this.isAllChecked = this.listOfData.every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate = this.listOfData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllChecked;
    this.numberOfChecked = this.listOfData.filter(item => this.mapOfCheckedId[item.id]).length;
  }

  checkAll(value: boolean): void {
    if (!this.listOfData) return;
    this.listOfData.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  clearCheck(): void {
    this.mapOfCheckedId = {};
    this.refreshStatus();
  }

  //#region 重置密码

  private initPasswordForm() {
    this.passwordForm = this.fb.group({
      newPassword: [null, [Validators.required, Validators.maxLength(50)]],
    });
  }

  private submitPasswordForm(): void {
    Object.keys(this.passwordForm.controls).forEach(key => {
      this.passwordForm.controls[key].markAsDirty();
      this.passwordForm.controls[key].updateValueAndValidity();
    });
    if (this.passwordForm.invalid) return;
    this.savePassword();
  }

  private getPasswordForm() {
    let password = new Password();
    let controls = this.passwordForm.controls;
    password.now = controls.newPassword.value;
    return password;
  }

  private savePassword() {
    let ids: number[] = [];
    this.listOfData.filter(item => this.mapOfCheckedId[item.id])
      .map(item => ids.push(item.id));
    let password = this.getPasswordForm();
    password.ids = ids;
    const url = UserManageUrl.URL_USER_RESET_PASSWORD;
    this.passwordLoading = true;
    this.http.post<ResultData<any>>(url, password)
      .pipe(tap(() => this.passwordLoading = false, () => this.passwordLoading = false))
      .subscribe(data => {
        if (data.success) {
          this.messageSrv.success('重置成功！');
          this.isPasswordVisible = false;
        } else if (data.message) {
          this.messageSrv.error(data.message);
        } else {
          this.messageSrv.error('重置失败！');
        }
      });
  }

  showPasswordModal() {
    this.isPasswordVisible = true;
  }

  handlePasswordOk(): void {
    this.submitPasswordForm();
  }

  handlePasswordCancel(): void {
    if (!this.passwordLoading) {
      this.isPasswordVisible = false;
    }
  }

  //#endregion

}
