import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { EngineConfig } from '../../engine-config';
import { PageData } from '../../engine-model';
import { NoticeUrl, Notice } from '../../notice-manage';

@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.less']
})
export class NoticeListComponent implements OnInit {

  pageIndex = 1;
  pageSize = EngineConfig.PAGE_SIZE;
  total = 0;
  listOfData: Notice[] = [];
  loading = false;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.searchData(true);
  }

  searchData(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    let notice = new Notice();
    notice.pageIndex = this.pageIndex;
    notice.pageSize = this.pageSize;
    const url = NoticeUrl.URL_NOTICE_LIST;
    this.loading = true;
    this.http.post<PageData<Notice>>(url, notice)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.listOfData = data.data;
        this.total = data.count;
      });
  }

  goInfo(id: number) {
    const url = NoticeUrl.URL_NOTICE_INFO;
    this.router.navigate([url, id]);
  }

}
