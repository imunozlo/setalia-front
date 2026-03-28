import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { NomenclaturasTiposService } from './tipos-nomenclaturas.service';
import { NomenclaturaTipoModel } from '../models/tipo-nomenclatura.model';

@Injectable({
  providedIn: 'root'
})
export class NomenclaturesTipusStoreService {
  // @ts-ignore
  private _nomenclaturastipo: BehaviorSubject<NomenclaturaTipoModel[]> = new BehaviorSubject(null);

  constructor(public service: NomenclaturasTiposService) {}

  public get nomenclaturesTipus$(): Observable<NomenclaturaTipoModel[]> {
    if (this._nomenclaturastipo.getValue() == null) {
      this.setNomenclaturesTipus();
    }
    return this._nomenclaturastipo.asObservable();
  }

  setNomenclaturesTipus() {
    this.service.listar().subscribe({
      error: () => {
        this._nomenclaturastipo.next([]);
      },
      next: response => {
        const datos = response.map((nom: NomenclaturaTipoModel) => new NomenclaturaTipoModel().deserialize(nom));
        this._nomenclaturastipo.next(datos);
      }
    });
  }
}
