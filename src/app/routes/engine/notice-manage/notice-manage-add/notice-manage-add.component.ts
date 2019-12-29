import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

import { ResultData } from '../../engine-model';
import { Department } from '../../department-manage';
import { NoticeManageUrl } from '../notice-manage-url';
import { Notice, NoticeDepartment } from '../notice-model';

@Component({
  selector: 'app-notice-manage-add',
  templateUrl: './notice-manage-add.component.html',
  styleUrls: ['./notice-manage-add.component.less']
})
export class NoticeManageAddComponent implements OnInit {

  form: FormGroup;
  loading = false;
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
    this.getDepartments();
  }

  private initForm() {
    this.form = this.fb.group({
      title: [null, [Validators.required, Validators.maxLength(50)]],
      dateRange: [null, [Validators.required]],
      departmentIds: [null, [Validators.required]],
      content: [null, []],
      keepOn: [true, []],
    });
  }

  private get departmentIds(): number[] {
    if (this.form.invalid) return null;
    return this.form.controls.departmentIds.value;
  }

  private get keepOn(): boolean {
    return this.form.controls.keepOn.value;
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

  private saveNotice() {
    let notice = this.getForm();
    if (!!this.departments) {
      notice.departments = this.departmentIds.map(item => new NoticeDepartment(0, item));
    }
    const url = NoticeManageUrl.URL_NOTICE_ADD;
    this.loading = true;
    this.http.post<ResultData<any>>(url, notice)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        if (data.success) {
          this.messageSrv.success('保存成功！');
          if (!this.keepOn) {
            this.goBack();
          }
        } else if (data.message) {
          this.messageSrv.error(data.message);
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
