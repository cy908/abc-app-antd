import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

import { ResultData } from '../../engine-model';
import { Department } from '../../department-manage';
import { NoticeManageUrl } from '../notice-manage-url';
import { Notice, NoticeDepartment } from '../notice-model';

@Component({
  selector: 'app-notice-manage-edit',
  templateUrl: './notice-manage-edit.component.html',
  styleUrls: ['./notice-manage-edit.component.less']
})
export class NoticeManageEditComponent implements OnInit {

  form: FormGroup;
  loading = false;
  departments: Department[] = null;
  departmentLoading = false;

  noticeId = 0;
  notice: Notice = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageSrv: NzMessageService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.initForm();
    this.noticeId = +this.route.snapshot.paramMap.get('id');
    this.getNotice();
  }

  private initForm() {
    this.form = this.fb.group({
      title: [null, [Validators.required, Validators.maxLength(50)]],
      dateRange: [null, [Validators.required]],
      departmentIds: [null, [Validators.required]],
      content: [null, []],
    });
  }

  private get departmentIds(): number[] {
    if (this.form.invalid) return null;
    return this.form.controls.departmentIds.value;
  }

  submitForm(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    });
    if (this.form.invalid) return;
    this.saveNotice();
  }

  private getForm() {
    let notice = new Notice();
    let controls = this.form.controls;
    notice.title = controls.title.value;
    const range: Array<Date> = controls.dateRange.value;
    if (range != null && range.length == 2) {
      let start = range[0], end = range[1];
      // 去掉秒和毫秒部分
      start.setSeconds(0, 0);
      end.setSeconds(0, 0);
      notice.startTime = start.toISOString();
      notice.endTime = end.toISOString();
    } else {
      notice.startTime = null;
      notice.endTime = null;
    }
    notice.content = controls.content.value;
    return notice;
  }

  private setForm() {
    let controls = this.form.controls;
    controls.title.setValue(this.notice.title);
    const start = this.notice.startTime;
    const end = this.notice.endTime;
    if (!!start && !!end) {
      const range = [new Date(start), new Date(end)];
      controls.dateRange.setValue(range);
    } else {
      controls.dateRange.setValue(null);
    }
    controls.content.setValue(this.notice.content);
    if (!!this.notice.departments) {
      controls.departmentIds.setValue(this.notice.departments.map(item => item.departmentId));
    }
  }

  private saveNotice() {
    let notice = this.getForm();
    notice.id = this.noticeId;
    if (!!this.departmentIds) {
      notice.departments = this.departmentIds.map(item => new NoticeDepartment(this.noticeId, item));
    }
    const url = NoticeManageUrl.URL_NOTICE_EDIT;
    this.loading = true;
    this.http.post<ResultData<any>>(url, notice)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        if (data.success) {
          this.messageSrv.success('保存成功！');
          this.goBack();
        } else if (data.message) {
          this.messageSrv.error(data.message);
        }
      });
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
        if (!!this.notice) {
          this.setForm();
          this.getDepartments();
        }
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

  goBack() {
    history.back();
  }

}
