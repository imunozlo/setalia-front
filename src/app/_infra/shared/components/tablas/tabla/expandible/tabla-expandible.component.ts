import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-tabla-expandible',
  templateUrl: './tabla-expandible.component.html'
})
export class TablaExpandibleComponent {
  @Input() permisos: string;
  @Input() expand: boolean;
  @Output() readonly expandChange = new EventEmitter<boolean>();

  constructor() {}

  expandir(): void {
    this.expand = !this.expand;
    this.expandChange.emit(this.expand);
  }
}
