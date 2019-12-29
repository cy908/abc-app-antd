import { IStore } from './i-store';

export class MemoryStore implements IStore {

    private cache: { [key: string]: string | null } = {};

    getItem(key: string): string {
        return this.cache[key];
    }

    setItem(key: string, value: string) {
        this.cache[key] = value;
    }

    removeItem(key: string) {
        this.cache[key] = null;
    }

}
