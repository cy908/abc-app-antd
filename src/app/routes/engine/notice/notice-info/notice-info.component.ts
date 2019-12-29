import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { NoticeUrl, Notice } from '../../notice-manage';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';

@Component({
  selector: 'app-notice-info',
  templateUrl: './notice-info.component.html',
  styleUrls: ['./notice-info.component.less']
})
export class NoticeInfoComponent implements OnInit {

  loading = false;

  noticeId = 0;
  notice: Notice = null;

  Editor = ClassicEditor;
  editorConfig = {
    language: 'zh-cn',
    toolbar: null,
  };

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
    const url = NoticeUrl.URL_NOTICE_INFO;
    this.loading = true;
    this.http.post<Notice>(url, notice)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.notice = data;
      });
  }

  goBack() {
    history.back();
  }

}
