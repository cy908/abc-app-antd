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
  selector: 'app-dict-manage-option-edit',
  templateUrl: './dict-manage-option-edit.component.html',
  styleUrls: ['./dict-manage-option-edit.component.less']
})
export class DictManageOptionEditComponent implements OnInit {

  form: FormGroup;
  loading = false;
  dictId = 0;
  id = 0;
  dictOption: DictOption = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private messageSrv: NzMessageService,
  ) { }

  ngOnInit() {
    this.initForm();
    this.dictId = +this.route.snapshot.paramMap.get('dictId');
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getDictOption();
  }

  private initForm() {
    this.form = this.fb.group({
      id: [null, [Validators.required, Validators.maxLength(50)]],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      code: [null, [Validators.required, Validators.maxLength(50)]],
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
    this.saveDictOption();
  }

  private getForm() {
    let dictOption = new DictOption();
    let controls = this.form.controls;
    dictOption.id = controls.id.value;
    dictOption.name = controls.name.value;
    dictOption.code = controls.code.value;
    dictOption.order = controls.order.value;
    dictOption.enable = controls.enable.value;
    dictOption.note = controls.note.value;
    return dictOption;
  }

  private setForm() {
    let controls = this.form.controls;
    controls.id.setValue(this.dictOption.id);
    controls.name.setValue(this.dictOption.name);
    controls.code.setValue(this.dictOption.code);
    controls.order.setValue(this.dictOption.order);
    controls.enable.setValue(this.dictOption.enable);
    controls.note.setValue(this.dictOption.note);
  }

  private saveDictOption() {
    let dictOption = this.getForm();
    dictOption.dictId = this.dictId;
    dictOption.oldId = this.id;
    const url = DictManageUrl.URL_DICT_OPTION_EDIT;
    this.loading = true;
    this.http.post<ResultData<any>>(url, dictOption)
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

  private getDictOption() {
    let dictOption = new DictOption();
    dictOption.dictId = this.dictId;
    dictOption.id = this.id;
    const url = DictManageUrl.URL_DICT_OPTION_INFO;
    this.loading = true;
    this.http.post<Dict>(url, dictOption)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.dictOption = data;
        if (!!this.dictOption) {
          this.setForm();
        }
      });
  }

  goBack() {
    history.back();
  }

}
