import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NzTreeComponent, NzTreeNodeOptions, NzTreeNode } from 'ng-zorro-antd';

import { ResultData } from '../../engine-model';
import { Department } from '../../department-manage';
import { User } from '../../user-manage';
import { RoleManageUrl } from '../role-manage-url';
import { Role, RoleUser } from '../role-model';

@Component({
  selector: 'app-role-manage-users',
  templateUrl: './role-manage-users.component.html',
  styleUrls: ['./role-manage-users.component.less']
})
export class RoleManageUsersComponent implements OnInit {

  @ViewChild('treeComponent', { static: false })
  treeComponent: NzTreeComponent;

  loading = false;
  roleId = 0;
  role: Role = null;
  departments: Department[] = null;
  users: User[] = null;
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
        if (!!this.role) {
          this.getDepartments();
        }
      });
  }

  private getDepartments() {
    const url = RoleManageUrl.URL_ROLE_DEPARTMENTS;
    this.loading = true;
    this.http.get<Department[]>(url)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.departments = data;
        this.getUsers();
      });
  }

  private getUsers() {
    let role = new Role();
    role.id = this.roleId;
    const url = RoleManageUrl.URL_ROLE_USERS;
    this.loading = true;
    this.http.post<User[]>(url, role)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.users = data;
        this.initTree();
      });
  }

  private saveRoleUser() {
    let roleUsers = this.getCheckedNode();
    const url = RoleManageUrl.URL_ROLE_USERS_SAVE;
    this.loading = true;
    this.http.post<ResultData<any>>(url, roleUsers)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        if (data.success) {
          this.goBack();
        }
      });
  }

  goSave() {
    this.saveRoleUser();
  }

  goBack() {
    history.back();
  }

  //#region 部门用户树

  private initTree() {
    if (this.departments == null || this.departments.length == 0) {
      return;
    }
    this.treeNodes = this._initTree(this.departments, false);
  }

  private _initTree(items: any[], isUser: boolean): NzTreeNodeOptions[] {
    return items.reduce<NzTreeNodeOptions[]>((accumulator, item) => {
      let node: NzTreeNodeOptions = {
        key: `${!isUser ? 'x' : ''}${item.id}`,
        title: !isUser ? item.name : `${item.username}（${item.name}）`,
        icon: !isUser ? 'gold' : 'user',
      };
      const children = item.children;
      if (children) {
        node.children = this._initTree(children, false);
      }
      if (isUser) {
        node.isLeaf = true;
        node.checked = item.checked;
      }
      if (!isUser && this.users != null && this.users.length > 0) {
        let users = this.users.filter(user => user.departmentId == item.id);
        if (users != null && users.length > 0) {
          let nodes = this._initTree(users, true);
          if (!node.children) {
            node.children = [];
          }
          node.children.push(...nodes);
        }
      }
      return accumulator.concat(node);
    }, []);
  }

  private getCheckedNode(): RoleUser[] {
    let roleUsers: RoleUser[] = [];
    let treeNodes = this.treeComponent.getTreeNodes()
    if (treeNodes != null && treeNodes.length > 0) {
      roleUsers = this._getCheckedNode(treeNodes);
    }
    if (roleUsers == null || roleUsers.length == 0) {
      roleUsers.push(new RoleUser(this.roleId, 0));
    }
    return roleUsers;
  }

  private _getCheckedNode(items: NzTreeNode[]): RoleUser[] {
    let roleUsers: RoleUser[] = [];
    items.forEach(item => {
      if (item.isChecked || item.isHalfChecked) {
        if (item.isLeaf) {
          roleUsers.push(new RoleUser(this.roleId, +item.key));
        } else {
          roleUsers.push(...this._getCheckedNode(item.children))
        }
      }
    });
    return roleUsers;
  }

  //#endregion

}
