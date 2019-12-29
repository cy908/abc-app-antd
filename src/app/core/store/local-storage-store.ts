import { IStore } from './i-store';

export class LocalStorageStore implements IStore {

    getItem(key: string): string {
        return localStorage.getItem(key);
    }

    setItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    removeItem(key: string) {
        localStorage.removeItem(key);
    }

}
