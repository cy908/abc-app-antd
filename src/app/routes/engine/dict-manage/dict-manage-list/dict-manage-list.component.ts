import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

import { EngineConfig } from '../../engine-config';
import { PageData, ResultData } from '../../engine-model';
import { DictManageUrl } from '../dict-manage-url';
import { Dict, DictOption } from '../dict-model';

@Component({
  selector: 'app-dict-manage-list',
  templateUrl: './dict-manage-list.component.html',
  styleUrls: ['./dict-manage-list.component.less']
})
export class DictManageListComponent implements OnInit {

  form: FormGroup;
  pageIndex = 1;
  pageSize = EngineConfig.PAGE_SIZE;
  total = 0;
  listOfData: Dict[] = [];
  loading = false;
  isAllChecked = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;

  dictTypeId = 0;
  dictTypes: DictOption[] = null;

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
    this.getDictTypes();
  }

  private initForm() {
    this.form = this.fb.group({
      dictType: [null, [Validators.required]],
      search: [null, [Validators.maxLength(50)]],
    });
  }

  private getDictType(): number {
    if (this.form.invalid) return null;
    return this.form.controls.dictType.value;
  }

  private setDictType(dictType: number): void {
    this.form.controls.dictType.setValue(dictType);
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
    let dict = new Dict();
    dict.pageIndex = this.pageIndex;
    dict.pageSize = this.pageSize;
    dict.type = this.getDictType();
    dict.search = this.search;
    const url = DictManageUrl.URL_DICT_LIST;
    this.loading = true;
    this.http.post<PageData<Dict>>(url, dict)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.listOfData = data.data;
        this.total = data.count;
        this.clearCheck();
      });
  }

  private getDictTypes() {
    const url = DictManageUrl.URL_DICT_TYPES;
    this.loading = true;
    this.http.get<DictOption[]>(url)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.dictTypes = data;
        if (this.dictTypes && this.dictTypes.length > 0) {
          if (this.dictTypeId > 0) {
            this.setDictType(this.dictTypeId);
          } else {
            this.setDictType(this.dictTypes[0].id);
          }
          this.searchData(true);
        }
      });
  }

  goInfo(id: number) {
    this.router.navigate([DictManageUrl.URL_DICT_INFO, id]);
  }

  goAdd() {
    this.router.navigate([DictManageUrl.URL_DICT_ADD, this.getDictType()]);
  }

  goEdit(id: number) {
    this.router.navigate([DictManageUrl.URL_DICT_EDIT, id]);
  }

  goDelete(id: number) {
    let dict = new Dict();
    dict.id = id;
    const url = DictManageUrl.URL_DICT_DELETE;
    this.loading = true;
    this.http.post<ResultData<any>>(url, dict)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        if (data.success) {
          this.messageSrv.success('删除成功！');
          this.searchData(true);
        } else if (data.message) {
          this.messageSrv.error(data.message);
        }
      });
  }

  goDictOption(id: number) {
    this.router.navigate([DictManageUrl.URL_DICT_OPTION_LIST, id]);
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
