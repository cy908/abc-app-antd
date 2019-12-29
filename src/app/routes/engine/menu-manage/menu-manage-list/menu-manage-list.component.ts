import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

import { EngineConfig } from '../../engine-config';
import { PageData, ResultData } from '../../engine-model';
import { MenuManageUrl } from '../menu-manage-url';
import { Menu } from '../menu-model';

@Component({
  selector: 'app-menu-manage-list',
  templateUrl: './menu-manage-list.component.html',
  styleUrls: ['./menu-manage-list.component.less']
})
export class MenuManageListComponent implements OnInit {

  form: FormGroup;
  pageIndex = 1;
  pageSize = EngineConfig.PAGE_SIZE;
  total = 0;
  listOfData: Menu[] = [];
  loading = false;
  isAllChecked = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private messageSrv: NzMessageService,
  ) { }

  ngOnInit() {
    this.initForm();
    this.searchData(true);
  }

  private initForm() {
    this.form = this.fb.group({
      search: [null, [Validators.maxLength(50)]],
      onlyMenu: [true, []],
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
    let menu = new Menu();
    menu.pageIndex = this.pageIndex;
    menu.pageSize = this.pageSize;
    menu.search = this.search;
    const url = MenuManageUrl.URL_MENU_LIST;
    this.loading = true;
    this.http.post<PageData<Menu>>(url, menu)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.listOfData = data.data;
        this.total = data.count;
        this.clearCheck();
      });
  }

  goInfo(id: number) {
    this.router.navigate([MenuManageUrl.URL_MENU_INFO, id]);
  }

  goAdd(id: number) {
    this.router.navigate([MenuManageUrl.URL_MENU_ADD, id]);
  }

  goEdit(id: number) {
    this.router.navigate([MenuManageUrl.URL_MENU_EDIT, id]);
  }

  goDelete(id: number) {
    let menu = new Menu();
    menu.id = id;
    const url = MenuManageUrl.URL_MENU_DELETE;
    this.loading = true;
    this.http.post<ResultData<any>>(url, menu)
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
