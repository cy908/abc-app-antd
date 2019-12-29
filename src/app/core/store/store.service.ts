import { Injectable } from '@angular/core';

import { IStore } from './i-store';
import { LocalStorageStore } from './local-storage-store';
import { SessionStorageStore } from './session-storage-store';
import { MemoryStore } from './memory-store';
import { ConfigService } from '../config';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private isSupportLocal = false;
  private isSupportSession = false;

  private localStorageStore: LocalStorageStore;
  private sessionStorageStore: SessionStorageStore;
  private memoryStore: MemoryStore;

  constructor(
    private configSrv: ConfigService,
  ) {
    this.isSupportLocal = this.isSupportLocalStorage();
    this.isSupportSession = this.isSupportSessionStorage();
    if (this.isSupportLocal) {
      this.localStorageStore = new LocalStorageStore();
    }
    if (this.isSupportSession) {
      this.sessionStorageStore = new SessionStorageStore();
    }
    this.memoryStore = new MemoryStore();
  }

  /** 获取存储 */
  getItem(key: string, storeType: 'localStorage' | 'sessionStorage' | 'memory' = 'localStorage'): string {
    return this.processStore(storeType).getItem(this.processKey(key, storeType));
  }

  /** 设置存储 */
  setItem(key: string, value: string, storeType: 'localStorage' | 'sessionStorage' | 'memory' = 'localStorage') {
    this.processStore(storeType).setItem(this.processKey(key, storeType), value);
  }

  /** 移除存储 */
  removeItem(key: string, storeType: 'localStorage' | 'sessionStorage' | 'memory' = 'localStorage') {
    this.processStore(storeType).removeItem(this.processKey(key, storeType));
  }

  /** 处理STORE */
  private processStore(storeType: 'localStorage' | 'sessionStorage' | 'memory'): IStore {
    if (storeType == 'localStorage' && this.isSupportLocal) {
      return this.localStorageStore;
    } else if (storeType == 'sessionStorage' && this.isSupportSession) {
      return this.sessionStorageStore;
    } else {
      return this.memoryStore;
    }
  }

  /** 处理KEY */
  private processKey(key: string, storeType: 'localStorage' | 'sessionStorage' | 'memory'): string {
    if (storeType == 'memory') {
      return key;
    }
    const prefix = this.configSrv.getConfig().name;
    return !!prefix ? `${prefix}-${key}` : key;
  }

  /** 是否支持LocalStorage */
  private isSupportLocalStorage(): boolean {
    try {
      const key = 'local_storage_test';
      localStorage.setItem(key, key);
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  }

  /** 是否支持SessionStorage */
  private isSupportSessionStorage(): boolean {
    try {
      const key = 'session_storage_test';
      sessionStorage.setItem(key, key);
      sessionStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  }

}
