import { IStore } from './i-store';

export class SessionStorageStore implements IStore {

    getItem(key: string): string {
        return sessionStorage.getItem(key);
    }

    setItem(key: string, value: string) {
        sessionStorage.setItem(key, value);
    }

    removeItem(key: string) {
        sessionStorage.removeItem(key);
    }

}
