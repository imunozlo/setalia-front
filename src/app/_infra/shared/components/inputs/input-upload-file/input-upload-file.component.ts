import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoaderService } from '../../carga/loader/loader.service';
import { ArchivosFotosService } from 'src/app/maestros/archivos/archivos-fotos.service';
import { I18NService } from 'src/app/_infra/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'lib-input-upload-file',
  templateUrl: './input-upload-file.component.html'
})
export class InputUploadFileComponent implements OnInit{
  @Input() id: number;
  @Input() plantillaId: number;
  @Input() grupoId: number;
  @Input() controlId: number;
  @Input() editable: boolean;
  @Input() aceptadas: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
  @Output() refrescar = new EventEmitter();
  url: string;
  archivoB64: string;
  upload = false;

  constructor(
    private msg: NzMessageService,
    private loaderService: LoaderService,
    private archivosFotosService: ArchivosFotosService,
    private i18n: I18NService,
    private modal: NzModalService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.url = `${environment.apiUrl}/plantilla-grupos/subir-documento`;
  }
  comprobarArchivo = (file: NzUploadFile) => {
    return new Observable((observer: Observer<boolean>) => {
      let esArchivoPermitido = false;
      if (this.aceptadas && this.aceptadas.length > 0) {
        this.aceptadas.map(t => {
          if (file.type === t) {
            esArchivoPermitido = true;
          }
        });
        if (!esArchivoPermitido) {
          this.msg.error(this.i18n.traducir('app.errorTipoArchivo'));
          observer.complete();
          return;
        }
      }
      const isLt10M = file.size! / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.msg.error(this.i18n.traducir('app.errorTamanyArchiu'));
        observer.complete();
        return;
      }
      observer.next(esArchivoPermitido && isLt10M);
      observer.complete();
    });
  };

  obtenerHeaders = () => {
    return {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json'
    };
  };

  guardarArchivo = (item: NzUploadXHRArgs) => {
    const formData = new FormData();
    formData.append('file', item.file as any);
    if (this.controlId != null){ // Se guarda desde control. Se requiere el control
      formData.append('controlId', this.controlId.toString());
    }else{ //Se guarda desde plantilla. Se requiere el grupo y la plantilla
      formData.append('plantillaId', this.plantillaId.toString());
      formData.append('grupoId', this.grupoId.toString());
    }

    const req = new HttpRequest(
      'POST',
      this.url,
      formData,
      { reportProgress: true }
    );

    this.loaderService.show();
    this.upload = true;

    return this.http.request(req).subscribe({
      next: event => {
        if (event instanceof HttpResponse) {
          this.upload = false;
          this.loaderService.hide();
          this.refrescar.emit();
          this.msg.success(this.i18n.traducir('app.documentoSubido'));
        }
      },
      error: () => {
        this.upload = false;
        this.loaderService.hide();
        this.msg.error(this.i18n.traducir('app.errorSubida'));
      }
    });
  };
}
