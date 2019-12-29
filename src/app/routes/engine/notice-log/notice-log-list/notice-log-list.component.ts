import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { EngineConfig } from '../../engine-config';
import { PageData } from '../../engine-model';
import { NoticeLogUrl } from '../../notice-manage/notice-log-url';
import { NoticeLog, Notice } from '../../notice-manage/notice-model';

@Component({
  selector: 'app-notice-log-list',
  templateUrl: './notice-log-list.component.html',
  styleUrls: ['./notice-log-list.component.less']
})
export class NoticeLogListComponent implements OnInit {

  noticeId = 0;

  form: FormGroup;
  pageIndex = 1;
  pageSize = EngineConfig.PAGE_SIZE;
  total = 0;
  listOfData: NoticeLog[] = [];
  loading = false;
  isAllChecked = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.noticeId = +this.route.snapshot.paramMap.get('id');
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
    let noticeLog = new NoticeLog();
    noticeLog.pageIndex = this.pageIndex;
    noticeLog.pageSize = this.pageSize;
    noticeLog.notice = new Notice();
    if (this.noticeId != 0) {
      noticeLog.notice.id = this.noticeId;
    }
    noticeLog.notice.search = this.search;
    const url = NoticeLogUrl.URL_NOTICE_LIST;
    this.loading = true;
    this.http.post<PageData<NoticeLog>>(url, noticeLog)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.listOfData = data.data;
        this.total = data.count;
      });
  }

  goInfo(logId: number) {
    this.router.navigate([NoticeLogUrl.URL_NOTICE_INFO, logId]);
  }

  goBack() {
    history.back();
  }

}
