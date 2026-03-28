// En un archivo directiva.ts
import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements AfterViewInit, OnChanges {
  @Input() appFocus: boolean;

  constructor(private elementRef: ElementRef, private cd: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.checkFocus();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appFocus']) {
      this.checkFocus();
    }
  }

  private checkFocus() {
    if (this.appFocus) {
      setTimeout(() => {
        this.elementRef.nativeElement.focus();
      });
    }
  }
}