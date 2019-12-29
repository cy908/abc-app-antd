import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

import { EngineConfig } from '../../engine-config';
import { PageData, ResultData } from '../../engine-model';
import { DepartmentManageUrl } from '../department-manage-url';
import { Department } from '../department-model';

@Component({
  selector: 'app-department-manage-list',
  templateUrl: './department-manage-list.component.html',
  styleUrls: ['./department-manage-list.component.less']
})
export class DepartmentManageListComponent implements OnInit {

  form: FormGroup;
  pageIndex = 1;
  pageSize = EngineConfig.PAGE_SIZE;
  total = 0;
  listOfData: Department[] = [];
  loading = false;
  isAllChecked = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private messageSrv: NzMessageService,
  ) { }

  ngOnInit() {
    this.initForm();
    this.searchData(true);
  }

  private initForm() {
    this.form = this.fb.group({
      search: [null, [Validators.maxLength(50)]],
    });
  }

  private get search(): string {
    if (this.form.invalid) return null;
    return this.form.controls.search.value;
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
    let department = new Department();
    department.pageIndex = this.pageIndex;
    department.pageSize = this.pageSize;
    department.search = this.search;
    const url = DepartmentManageUrl.URL_DEPARTMENT_LIST;
    this.loading = true;
    this.http.post<PageData<Department>>(url, department)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.listOfData = data.data;
        this.total = data.count;
        this.clearCheck();
      });
  }

  goInfo(id: number) {
    this.router.navigate([DepartmentManageUrl.URL_DEPARTMENT_INFO, id]);
  }

  goAdd(id: number) {
    this.router.navigate([DepartmentManageUrl.URL_DEPARTMENT_ADD, id]);
  }

  goEdit(id: number) {
    this.router.navigate([DepartmentManageUrl.URL_DEPARTMENT_EDIT, id]);
  }

  goDelete(id: number) {
    let department = new Department();
    department.id = id;
    const url = DepartmentManageUrl.URL_DEPARTMENT_DELETE;
    this.loading = true;
    this.http.post<ResultData<any>>(url, department)
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

}
