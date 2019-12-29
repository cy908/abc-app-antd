import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { Department } from '../../department-manage';
import { NoticeManageUrl } from '../notice-manage-url';
import { Notice } from '../notice-model';

@Component({
  selector: 'app-notice-manage-info',
  templateUrl: './notice-manage-info.component.html',
  styleUrls: ['./notice-manage-info.component.less']
})
export class NoticeManageInfoComponent implements OnInit {

  loading = false;

  noticeId = 0;
  notice: Notice = null;

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
    this.noticeId = +this.route.snapshot.paramMap.get('id');
    this.getNotice();
  }

  private getNotice() {
    let notice = new Notice();
    notice.id = this.noticeId;
    const url = NoticeManageUrl.URL_NOTICE_INFO;
    this.loading = true;
    this.http.post<Notice>(url, notice)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.notice = data;
        this.getDepartments();
      });
  }

  private getDepartments() {
    const url = NoticeManageUrl.URL_NOTICE_DEPARTMENTS;
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
    if (this.listOfData != null && this.listOfData.length > 0 && this.notice != null && this.notice.departments != null && this.notice.departments.length > 0) {
      this.listOfData.forEach(item => {
        if (this.notice.departments.some(dpt => dpt.departmentId == item.id)) {
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
