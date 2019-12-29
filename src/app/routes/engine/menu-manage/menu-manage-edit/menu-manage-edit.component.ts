import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

import { ResultData } from '../../engine-model';
import { MenuManageUrl } from '../menu-manage-url';
import { Menu } from '../menu-model';

@Component({
  selector: 'app-menu-manage-edit',
  templateUrl: './menu-manage-edit.component.html',
  styleUrls: ['./menu-manage-edit.component.less']
})
export class MenuManageEditComponent implements OnInit {

  form: FormGroup;
  loading = false;
  menuId = 0;
  menu: Menu = null;
  parentId = 0;
  parentMenu: Menu = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private messageSrv: NzMessageService,
  ) { }

  ngOnInit() {
    this.initForm();
    this.menuId = +this.route.snapshot.paramMap.get('id');
    this.getMenu();
  }

  private initForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(50)]],
      url: [null, [Validators.maxLength(50)]],
      matIcon: [null, [Validators.maxLength(50)]],
      antdIcon: [null, [Validators.maxLength(50)]],
      antdIconTheme: [null, [Validators.maxLength(50)]],
      antdIconTwotone: [null, [Validators.maxLength(50)]],
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
    this.saveMenu();
  }

  private getForm() {
    let menu = new Menu();
    let controls = this.form.controls;
    menu.name = controls.name.value;
    menu.url = controls.url.value;
    menu.matIcon = controls.matIcon.value;
    menu.antdIcon = controls.antdIcon.value;
    menu.antdIconTheme = controls.antdIconTheme.value;
    menu.antdIconTwotone = controls.antdIconTwotone.value;
    menu.enable = controls.enable.value;
    menu.note = controls.note.value;
    return menu;
  }

  private setForm() {
    let controls = this.form.controls;
    controls.name.setValue(this.menu.name);
    controls.url.setValue(this.menu.url);
    controls.matIcon.setValue(this.menu.matIcon);
    controls.antdIcon.setValue(this.menu.antdIcon);
    controls.antdIconTheme.setValue(this.menu.antdIconTheme);
    controls.antdIconTwotone.setValue(this.menu.antdIconTwotone);
    controls.enable.setValue(this.menu.enable);
    controls.note.setValue(this.menu.note);
  }

  private saveMenu() {
    let menu = this.getForm();
    menu.id = this.menuId;
    menu.parentId = this.parentId;
    const url = MenuManageUrl.URL_MENU_EDIT;
    this.loading = true;
    this.http.post<ResultData<any>>(url, menu)
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

  private getMenu() {
    let menu = new Menu();
    menu.id = this.menuId;
    const url = MenuManageUrl.URL_MENU_INFO;
    this.loading = true;
    this.http.post<Menu>(url, menu)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.menu = data;
        if (!!this.menu) {
          this.setForm();
          this.parentId = this.menu.parentId;
          if (this.parentId > 0) {
            this.getParentMenu();
          }
        }
      });
  }

  private getParentMenu() {
    let menu = new Menu();
    menu.id = this.parentId;
    const url = MenuManageUrl.URL_MENU_INFO;
    this.loading = true;
    this.http.post<Menu>(url, menu)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.parentMenu = data;
      });
  }

  goBack() {
    history.back();
  }

}
