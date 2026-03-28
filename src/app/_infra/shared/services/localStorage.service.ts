import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {
  private ls = window.localStorage;

  public setItem(key: string, value: any): boolean {
    value = JSON.stringify(value);
    this.ls.setItem(key, value);
    return true;
  }

  public getItem(key: string): any {
    const value = this.ls.getItem(key);
    try {
      // @ts-ignore
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }

  public removeItem(key: string): boolean {
    this.ls.removeItem(key);
    return true;
  }

  public existItem(key: string): boolean {
    const value = this.ls.getItem(key);
    if (value) {
      return true;
    } else {
      return false;
    }
  }

  public clear(): void {
    this.ls.clear();
  }
}
