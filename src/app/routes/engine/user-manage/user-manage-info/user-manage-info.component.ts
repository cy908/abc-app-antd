import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { UserManageUrl } from '../user-manage-url';
import { User } from '../user-model';

@Component({
  selector: 'app-user-manage-info',
  templateUrl: './user-manage-info.component.html',
  styleUrls: ['./user-manage-info.component.less']
})
export class UserManageInfoComponent implements OnInit {

  loading = false;
  userId = 0;
  user: User = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.getUser();
  }

  private getUser() {
    let user = new User();
    user.id = this.userId;
    const url = UserManageUrl.URL_USER_INFO;
    this.loading = true;
    this.http.post<User>(url, user)
      .pipe(tap(() => this.loading = false, () => this.loading = false))
      .subscribe(data => {
        this.user = data;
      });
  }

  goBack() {
    history.back();
  }

}
