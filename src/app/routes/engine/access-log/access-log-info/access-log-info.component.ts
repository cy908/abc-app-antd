import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { AccessLogUrl } from '../access-log-url';
import { AccessLog } from '../access-log-model';

@Component({
  selector: 'app-access-log-info',
  templateUrl: './access-log-info.component.html',
  styleUrls: ['./access-log-info.component.less']
})
export class AccessLogInfoComponent implements OnInit {

  loading = false;

  accessLogId = 0;
  accessLog: AccessLog = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.accessLogId = +this.route.snapshot.paramMap.get('id');
    this.getAccessLog();
  }

  private getAccessLog() {
    let accessLog = new AccessLog();
    accessLog.id = this.accessLogId;
    const url = AccessLogUrl.URL_ACCESS_LOG_INFO;
    this.loading = true;
    this.http.post<AccessLog>(url, accessLog)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.accessLog = data;
      });
  }

  goBack() {
    history.back();
  }

}
