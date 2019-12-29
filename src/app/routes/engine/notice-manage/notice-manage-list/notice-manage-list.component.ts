import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

import { EngineConfig } from '../../engine-config';
import { PageData, ResultData } from '../../engine-model';
import { Department } from '../../department-manage';
import { NoticeManageUrl } from '../notice-manage-url';
import { Notice } from '../notice-model';
import { NoticeLogUrl } from '../notice-log-url';

@Component({
  selector: 'app-notice-manage-list',
  templateUrl: './notice-manage-list.component.html',
  styleUrls: ['./notice-manage-list.component.less']
})
export class NoticeManageListComponent implements OnInit {

  form: FormGroup;
  pageIndex = 1;
  pageSize = EngineConfig.PAGE_SIZE;
  total = 0;
  listOfData: Notice[] = [];
  loading = false;
  isAllChecked = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;

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
    let notice = new Notice();
    notice.pageIndex = this.pageIndex;
    notice.pageSize = this.pageSize;
    notice.search = this.search;
    notice.departmentId = this.departmentId;
    const url = NoticeManageUrl.URL_NOTICE_LIST;
    this.loading = true;
    this.http.post<PageData<Notice>>(url, notice)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.listOfData = data.data;
        this.total = data.count;
        this.clearCheck();
      });
  }

  private getDepartments() {
    const url = NoticeManageUrl.URL_NOTICE_DEPARTMENTS;
    this.departmentLoading = true;
    this.http.get<Department[]>(url)
      .pipe(tap(() => this.departmentLoading = false, () => this.departmentLoading = false))
      .subscribe(data => {
        this.departments = data;
      });
  }

  goInfo(id: number) {
    this.router.navigate([NoticeManageUrl.URL_NOTICE_INFO, id]);
  }

  goAdd() {
    this.router.navigate([NoticeManageUrl.URL_NOTICE_ADD]);
  }

  goEdit(id: number) {
    this.router.navigate([NoticeManageUrl.URL_NOTICE_EDIT, id]);
  }

  goLog(id: number) {
    this.router.navigate([NoticeLogUrl.URL_NOTICE_LIST, id]);
  }

  goDelete(id: number) {
    let notice = new Notice();
    notice.id = id;
    const url = NoticeManageUrl.URL_NOTICE_DELETE;
    this.loading = true;
    this.http.post<ResultData<any>>(url, notice)
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
