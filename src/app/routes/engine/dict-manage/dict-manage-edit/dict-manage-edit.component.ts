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
  selector: 'app-dict-manage-edit',
  templateUrl: './dict-manage-edit.component.html',
  styleUrls: ['./dict-manage-edit.component.less']
})
export class DictManageEditComponent implements OnInit {

  form: FormGroup;
  loading = false;
  dictId = 0;
  dict: Dict = null;
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
    this.dictId = +this.route.snapshot.paramMap.get('id');
    this.getDict();
  }

  private initForm() {
    this.form = this.fb.group({
      id: [null, [Validators.required, Validators.maxLength(50)]],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      order: [null, [Validators.required, Validators.maxLength(50)]],
      enable: [true, []],
      note: [null, [Validators.maxLength(100)]],
    });
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

  private setForm() {
    let controls = this.form.controls;
    controls.id.setValue(this.dict.id);
    controls.name.setValue(this.dict.name);
    controls.order.setValue(this.dict.order);
    controls.enable.setValue(this.dict.enable);
    controls.note.setValue(this.dict.note);
  }

  private saveDict() {
    let dict = this.getForm();
    dict.type = this.dict.type;
    dict.oldId = this.dictId;
    const url = DictManageUrl.URL_DICT_EDIT;
    this.loading = true;
    this.http.post<ResultData<any>>(url, dict)
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

  private getDict() {
    let dict = new Dict();
    dict.id = this.dictId;
    const url = DictManageUrl.URL_DICT_INFO;
    this.loading = true;
    this.http.post<Dict>(url, dict)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.dict = data;
        if (!!this.dict) {
          this.setForm();
          this.getDictType();
        }
      });
  }

  private getDictType() {
    let dictOption = new DictOption();
    dictOption.id = this.dict.type;
    const url = DictManageUrl.URL_DICT_TYPE;
    this.loading = true;
    this.http.post<DictOption>(url, dictOption)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.dictType = data;
      });
  }

  goBack() {
    if (!!this.dict) {
      this.router.navigate([DictManageUrl.URL_DICT_LIST, this.dict.type]);
    } else {
      history.back();
    }
  }

}
