import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private _scrolling = new BehaviorSubject<boolean>(false);
  scrolling$ = this._scrolling.asObservable();

  setScroll(value: boolean) {
    this._scrolling.next(value);
  }
}
