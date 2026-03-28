import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { environment } from '@env/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';

import { ArchivosFotosService } from '../../../../../maestros/archivos/archivos-fotos.service';
import { I18NService } from '../../../../core';
import { DialogConfirmacionComponent } from '../../../components/dialogs/confirmacion/dialog-confirmacion.component';
import { LoaderService } from '../../carga/loader/loader.service';

@Component({
  selector: 'lib-input-upload-image',
  templateUrl: './input-upload-image.component.html'
})
export class InputUploadImageComponent implements OnInit, OnChanges {
  @Input() id: number;
  @Input() tipo: string;
  @Input() editable: boolean;
  @Input() aceptadas: string[] = ['image/jpeg', 'image/jpg', 'image/png'];
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
    this.url = `${environment.apiUrl}/archivos-avatares`;
    if (this.id) {
      this.obtenerImatge();
    }
  }

  ngOnChanges(): void {
    if (this.id) {
      this.obtenerImatge();
    }
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
    formData.append('tipo', this.tipo);
    formData.append('id', this.id.toString());
    const req = new HttpRequest('POST', this.url, formData, {
      reportProgress: true,
      withCredentials: false
    });
    this.loaderService.show();
    this.upload = true;
    // @ts-ignore
    return this.http.request(req).subscribe(
      //@ts-ignore
      (event: HttpEvent<{}>): void => {
        if (event instanceof HttpResponse) {
          /* success */
          // @ts-ignore
          this.refrescar.emit();
          this.upload = false;
          this.loaderService.hide();
        }
      },
      () => {
        /* error */
        this.upload = false;
        this.loaderService.hide();
      }
    );
  };

  obtenerImatge() {
    this.archivosFotosService
      .obtenerAvatar(this.id, {
        tipoAvatar: this.tipo,
        esMiniatura: false
      })
      .subscribe(response => {
        this.archivoB64 = response.b64;
      });
  }

  eliminar() {
    const modal = this.modal.create({
      nzTitle: this.i18n.traducir('app.eliminarAvatarTitulo'),
      nzContent: DialogConfirmacionComponent,
      nzData: { aceptar: 'app.siEliminar', cancelar: 'app.noEliminar' },
      nzClosable: false,
      nzFooter: null
    });
    modal.afterClose.subscribe((response: any) => {
      if (response) {
        this.archivosFotosService
          .eliminarAvatar(this.id, {
            tipoAvatar: this.tipo,
            esMiniatura: true
          })
          .subscribe(() => {
            this.refrescar.emit();
          });
      }
    });
  }
}
