import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

import { ConfigService } from 'src/app/core/config';
import { TokenService } from 'src/app/core/token';
import { EngineUrl, ResultData } from 'src/app/routes/engine';
import { UserUrl, User, Password } from 'src/app/routes/engine/user-manage';
import { MenuUrl } from 'src/app/routes/engine/menu-manage';
import { NoticeUrl } from 'src/app/routes/engine/notice-manage';
import { MenuData } from './menu-model';

@Component({
  selector: 'app-layout-default',
  templateUrl: './layout-default.component.html',
  styleUrls: ['./layout-default.component.less']
})
export class LayoutDefaultComponent implements OnInit {

  isCollapsed = false;
  title = '';
  copyright = '';
  menus: MenuData[] = null;
  user: User = null;
  noticeCount = 0;

  passwordForm: FormGroup;
  passwordLoading = false;
  isPasswordVisible = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private messageSrv: NzMessageService,
    private modalService: NzModalService,
    private configSrv: ConfigService,
    private tokenSrv: TokenService,
  ) { }

  ngOnInit() {
    this.initConfig();
    this.initPasswordForm();
    this.getMenus();
    this.getUser();
    this.getNoticeCount();
  }

  private initConfig() {
    const config = this.configSrv.getConfig();
    this.title = config.title;
    this.copyright = config.copyright;
  }

  private getMenus() {
    const url = MenuUrl.URL_MENU_LIST;
    this.http.get<MenuData[]>(url).subscribe(
      data => this.menus = data
    );
  }

  private getUser() {
    const url = UserUrl.URL_USER_INFO;
    this.http.get<User>(url).subscribe(
      data => this.user = data
    );
  }

  private getNoticeCount() {
    const url = NoticeUrl.URL_NOTICE_COUNT;
    this.http.get<number>(url).subscribe(
      data => this.noticeCount = data
    );
  }

  goMain() {
    const url = EngineUrl.URL_MAIN;
    this.router.navigate([url]);
  }

  goNotice() {
    const url = NoticeUrl.URL_NOTICE;
    this.router.navigate([url]);
  }

  //#region 修改密码

  private newPasswordValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value === this.passwordForm.controls.oldPassword.value) {
      return { error: true, newPassword: true };
    }
    return {};
  };

  private confirmPasswordValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.passwordForm.controls.newPassword.value) {
      return { error: true, confirmPassword: true };
    }
    return {};
  };

  validateNewPassword() {
    setTimeout(() => this.passwordForm.controls.newPassword.updateValueAndValidity());
  }

  validateConfirmPassword() {
    setTimeout(() => this.passwordForm.controls.confirmPassword.updateValueAndValidity());
  }

  private initPasswordForm() {
    this.passwordForm = this.fb.group({
      oldPassword: [null, [Validators.required, Validators.maxLength(50)]],
      newPassword: [null, [Validators.required, Validators.maxLength(50), this.newPasswordValidator]],
      confirmPassword: [null, [Validators.required, Validators.maxLength(50), this.confirmPasswordValidator]],
    });
  }

  private submitPasswordForm(): void {
    Object.keys(this.passwordForm.controls).forEach(key => {
      this.passwordForm.controls[key].markAsDirty();
      this.passwordForm.controls[key].updateValueAndValidity();
    });
    if (this.passwordForm.invalid) return;
    this.savePassword();
  }

  private getPasswordForm() {
    let password = new Password();
    let controls = this.passwordForm.controls;
    password.old = controls.oldPassword.value;
    password.now = controls.newPassword.value;
    return password;
  }

  private savePassword() {
    let password = this.getPasswordForm();
    password.id = this.user.id;
    const title = '确认修改？';
    this.modalService.confirm({
      nzTitle: title,
      nzOnOk: () => {
        const url = UserUrl.URL_USER_EDIT_PASSWORD;
        this.passwordLoading = true;
        this.http.post<ResultData<any>>(url, password)
          .pipe(tap(() => this.passwordLoading = false, () => this.passwordLoading = false))
          .subscribe(data => {
            if (data.success) {
              this.messageSrv.success('修改成功！');
              this.isPasswordVisible = false;
            } else if (data.message) {
              this.messageSrv.error(data.message);
            } else {
              this.messageSrv.error('修改失败！');
            }
          });
      }
    });
  }

  showPasswordModal() {
    this.isPasswordVisible = true;
  }

  handlePasswordOk(): void {
    this.submitPasswordForm();
  }

  handlePasswordCancel(): void {
    if (!this.passwordLoading) {
      this.isPasswordVisible = false;
    }
  }

  //#endregion

  exitApp() {
    const title = '确认退出？';
    this.modalService.confirm({
      nzTitle: title,
      nzOnOk: () => {
        this.tokenSrv.clearToken();
        this.router.navigate([EngineUrl.URL_LOGIN]);
      }
    });
  }

}
