import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NzTreeComponent, NzTreeNodeOptions, NzTreeNode } from 'ng-zorro-antd';

import { ResultData } from '../../engine-model';
import { Menu } from '../../menu-manage';
import { RoleManageUrl } from '../role-manage-url';
import { Role, RoleMenu } from '../role-model';

@Component({
  selector: 'app-role-manage-menus',
  templateUrl: './role-manage-menus.component.html',
  styleUrls: ['./role-manage-menus.component.less']
})
export class RoleManageMenusComponent implements OnInit {

  @ViewChild('treeComponent', { static: false })
  treeComponent: NzTreeComponent;

  loading = false;
  roleId = 0;
  role: Role = null;
  menus: Menu[] = null;
  treeNodes: NzTreeNodeOptions[] = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.roleId = +this.route.snapshot.paramMap.get('id');
    this.getRole();
  }

  private getRole() {
    let role = new Role();
    role.id = this.roleId;
    const url = RoleManageUrl.URL_ROLE_INFO;
    this.loading = true;
    this.http.post<Role>(url, role)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.role = data;
        if (this.role != null) {
          this.getMenus();
        }
      });
  }

  private getMenus() {
    let role = new Role();
    role.id = this.roleId;
    const url = RoleManageUrl.URL_ROLE_MENUS;
    this.loading = true;
    this.http.post<Menu[]>(url, role)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.menus = data;
        this.initTree();
      });
  }

  private saveRoleMenu() {
    let roleMenus = this.getCheckedNode();
    const url = RoleManageUrl.URL_ROLE_MENUS_SAVE;
    this.loading = true;
    this.http.post<ResultData<any>>(url, roleMenus)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        if (data.success) {
          this.goBack();
        }
      });
  }

  goSave() {
    this.saveRoleMenu();
  }

  goBack() {
    history.back();
  }

  //#region 菜单树

  private initTree() {
    if (this.menus == null || this.menus.length == 0) {
      return;
    }
    this.treeNodes = this._initTree(this.menus);
  }

  private _initTree(items: Menu[]): NzTreeNodeOptions[] {
    return items.reduce<NzTreeNodeOptions[]>((accumulator, item) => {
      let node: NzTreeNodeOptions = {
        key: `${item.id}`,
        title: item.name,
        icon: item.antdIcon,
      };
      const children = item.children;
      if (children) {
        node.children = this._initTree(children);
      } else {
        node.isLeaf = true;
        node.checked = item.checked;
      }
      return accumulator.concat(node);
    }, []);
  }

  private getCheckedNode(): RoleMenu[] {
    let roleMenus: RoleMenu[] = [];
    let treeNodes = this.treeComponent.getTreeNodes()
    if (treeNodes != null && treeNodes.length > 0) {
      roleMenus = this._getCheckedNode(treeNodes);
    }
    if (roleMenus == null || roleMenus.length == 0) {
      roleMenus.push(new RoleMenu(this.roleId, 0));
    }
    return roleMenus;
  }

  private _getCheckedNode(items: NzTreeNode[]): RoleMenu[] {
    let roleMenus: RoleMenu[] = [];
    items.forEach(item => {
      if (item.isChecked || item.isHalfChecked) {
        roleMenus.push(new RoleMenu(this.roleId, +item.key));
        if (!item.isLeaf) {
          roleMenus.push(...this._getCheckedNode(item.children))
        }
      }
    });
    return roleMenus;
  }

  //#endregion

}
