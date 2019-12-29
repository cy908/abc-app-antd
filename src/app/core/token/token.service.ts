import { Injectable } from '@angular/core';

import { StoreService } from '../store';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY = 'TOKEN';

  constructor(
    private storeSrv: StoreService,
  ) { }

  getToken(): string {
    return this.storeSrv.getItem(this.TOKEN_KEY);
  }

  setToken(token: string) {
    this.storeSrv.setItem(this.TOKEN_KEY, token);
  }

  clearToken() {
    this.storeSrv.removeItem(this.TOKEN_KEY);
  }

}
