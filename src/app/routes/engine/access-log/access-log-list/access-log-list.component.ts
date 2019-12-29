import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { EngineConfig } from '../../engine-config';
import { PageData } from '../../engine-model';
import { AccessLogUrl } from '../access-log-url';
import { AccessLog } from '../access-log-model';

@Component({
  selector: 'app-access-log-list',
  templateUrl: './access-log-list.component.html',
  styleUrls: ['./access-log-list.component.less']
})
export class AccessLogListComponent implements OnInit {

  form: FormGroup;
  pageIndex = 1;
  pageSize = EngineConfig.PAGE_SIZE;
  total = 0;
  listOfData: AccessLog[] = [];
  loading = false;
  isAllChecked = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
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
    let accessLog = new AccessLog();
    accessLog.pageIndex = this.pageIndex;
    accessLog.pageSize = this.pageSize;
    accessLog.search = this.search;
    const url = AccessLogUrl.URL_ACCESS_LOG_LIST;
    this.loading = true;
    this.http.post<PageData<AccessLog>>(url, accessLog)
      .pipe(tap(
        () => this.loading = false,
        () => this.loading = false))
      .subscribe(data => {
        this.listOfData = data.data;
        this.total = data.count;
        this.clearCheck();
      });
  }

  goInfo(id: number) {
    this.router.navigate([AccessLogUrl.URL_ACCESS_LOG_INFO, id]);
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
