import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { Department } from '../../department-manage';
import { NoticeLogUrl } from '../../notice-manage/notice-log-url';
import { NoticeLog } from '../../notice-manage/notice-model';

@Component({
  selector: 'app-notice-log-info',
  templateUrl: './notice-log-info.component.html',
  styleUrls: ['./notice-log-info.component.less']
})
export class NoticeLogInfoComponent implements OnInit {

  loading = false;

  logId = 0;
  noticeLog: NoticeLog = null;

  departmentLoading = false;
  listOfData: Department[] = [];
  isAllChecked = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.logId = +this.route.snapshot.paramMap.get('id');
    this.getNotice();
  }

  private getNotice() {
    let notice = new NoticeLog();
    notice.logId = this.logId;
    const url = NoticeLogUrl.URL_NOTICE_INFO;
    this.loading = true;
    this.http.post<NoticeLog>(url, notice)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.noticeLog = data;
        this.getDepartments();
      });
  }

  private getDepartments() {
    const url = NoticeLogUrl.URL_NOTICE_DEPARTMENTS;
    this.departmentLoading = true;
    this.http.get<Department[]>(url)
      .pipe(tap(() => this.departmentLoading = false, () => this.departmentLoading = false))
      .subscribe(data => {
        this.listOfData = data;
        this.clearCheck();
        this.setCheck();
      });
  }

  private setCheck() {
    if (this.listOfData != null && this.listOfData.length > 0
      && this.noticeLog != null && this.noticeLog.notice.departments != null && this.noticeLog.notice.departments.length > 0) {
      this.listOfData.forEach(item => {
        if (this.noticeLog.notice.departments.some(dpt => dpt.departmentId == item.id)) {
          this.mapOfCheckedId[item.id] = true;
        }
      });
    }
  }

  goBack() {
    history.back();
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
