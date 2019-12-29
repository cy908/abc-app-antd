import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { MenuManageUrl } from '../menu-manage-url';
import { Menu } from '../menu-model';

@Component({
  selector: 'app-menu-manage-info',
  templateUrl: './menu-manage-info.component.html',
  styleUrls: ['./menu-manage-info.component.less']
})
export class MenuManageInfoComponent implements OnInit {

  loading = false;
  menuId = 0;
  menu: Menu = null;
  parentId = 0;
  parentMenu: Menu = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.menuId = +this.route.snapshot.paramMap.get('id');
    this.getMenu();
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
