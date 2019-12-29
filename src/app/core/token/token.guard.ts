import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private router: Router,
    private tokenSrv: TokenService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.process();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.process();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.process();
  }

  private process(): boolean {
    const res = this.checkToken(this.tokenSrv.getToken());
    if (!res) {
      this.toLogin();
    }
    return res;
  }

  private checkToken(token: string): boolean {
    return token != null && typeof token === 'string' && token.length > 0;
  }

  private toLogin() {
    this.router.navigate(['login']);
  }

}
