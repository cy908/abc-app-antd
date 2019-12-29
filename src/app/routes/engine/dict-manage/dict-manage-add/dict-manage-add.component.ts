import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

import { ResultData } from '../../engine-model';
import { DictManageUrl } from '../dict-manage-url';
import { Dict, DictOption } from '../dict-model';

@Component({
  selector: 'app-dict-manage-add',
  templateUrl: './dict-manage-add.component.html',
  styleUrls: ['./dict-manage-add.component.less']
})
export class DictManageAddComponent implements OnInit {

  form: FormGroup;
  loading = false;
  dictTypeId = 0;
  dictType: DictOption = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private messageSrv: NzMessageService,
  ) { }

  ngOnInit() {
    this.initForm();
    this.dictTypeId = +this.route.snapshot.paramMap.get('type');
    this.getDictType();
  }

  private initForm() {
    this.form = this.fb.group({
      id: [null, [Validators.required, Validators.maxLength(50)]],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      order: [null, [Validators.required, Validators.maxLength(50)]],
      enable: [true, []],
      note: [null, [Validators.maxLength(100)]],
      keepOn: [true, []],
    });
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
    this.saveDict();
  }

  private getForm() {
    let dict = new Dict();
    let controls = this.form.controls;
    dict.id = controls.id.value;
    dict.name = controls.name.value;
    dict.order = controls.order.value;
    dict.enable = controls.enable.value;
    dict.note = controls.note.value;
    return dict;
  }

  private saveDict() {
    let dict = this.getForm();
    dict.type = this.dictTypeId;
    const url = DictManageUrl.URL_DICT_ADD;
    this.loading = true;
    this.http.post<ResultData<any>>(url, dict)
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

  private getDictType() {
    let dictOption = new DictOption();
    dictOption.id = this.dictTypeId;
    const url = DictManageUrl.URL_DICT_TYPE;
    this.loading = true;
    this.http.post<DictOption>(url, dictOption)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.dictType = data;
      });
  }

  goBack() {
    this.router.navigate([DictManageUrl.URL_DICT_LIST, this.dictTypeId]);
  }

}
