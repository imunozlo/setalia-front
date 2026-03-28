import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { I18NService } from '../i18n/i18n.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    public http: _HttpClient,
    private i18n: I18NService,
    public msg: NzMessageService
  ) {}

  get(url: string, params?: HttpParams) {
    let urlFormada: Observable<any>;
    if (params) {
      urlFormada = this.http.get(url, { params });
    } else {
      urlFormada = this.http.get(url);
    }
    return urlFormada.pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError(err => {
        throwError(() => new Error(err));
        return err;
      })
    );
  }

  getBlob(url: string, params?: HttpParams): Observable<Blob> {
    return this.http
      .get(url, {
        params,
        responseType: 'blob'
      })
      .pipe(
        catchError(err => {
          return throwError(() => err);
        })
      );
  }

  post(url: string, body: any, activeLoading: boolean = false, openDialogAfterResult: boolean = false) {
    let idMensaje = '';
    if (activeLoading) {
      idMensaje = this.msg.loading(this.i18n.traducir('app.guardando')).messageId;
    }
    return this.http.post(url, body).pipe(
      map((resp: any) => {
        if (openDialogAfterResult) {
          this.msg.remove(idMensaje);
          this.msg.success(this.i18n.traducir('app.guardadoCorrecto'));
          return resp;
        } else {
          return resp;
        }
      }),
      catchError(err => {
        if (openDialogAfterResult) {
          this.msg.remove(idMensaje);
          this.msg.error(this.i18n.traducir(err.error.errorTag), { nzDuration: 5000 });
          throwError(() => new Error(err));
        } else {
          this.msg.remove(idMensaje);
          this.msg.error(this.i18n.traducir(err.error.errorTag), { nzDuration: 5000 });
          return err;
        }
      })
    );
  }

  guardar(url: string, body: any, id: any = null) {
    const idMensaje = this.msg.loading(this.i18n.traducir('app.guardando')).messageId;
    if (id) {
      return this.http.put(`${url}/${id}`, body).pipe(
        map((resp: any) => {
          this.msg.remove(idMensaje);
          this.msg.success(this.i18n.traducir('app.guardadoCorrecto'));
          return resp;
        }),
        catchError(err => {
          this.msg.remove(idMensaje);
          throwError(() => new Error(err));
          this.msg.error(this.i18n.traducir(err.error.errorTag), { nzDuration: 5000 });
          return err;
        })
      );
    } else {
      return this.http.post(url, body).pipe(
        map((resp: any) => {
          this.msg.remove(idMensaje);
          this.msg.success(this.i18n.traducir('app.guardadoCorrecto'));
          return resp;
        }),
        catchError(err => {
          this.msg.remove(idMensaje);
          throwError(() => new Error(err));
          this.msg.error(this.i18n.traducir(err.error.errorTag), { nzDuration: 5000 });
          return err;
        })
      );
    }
  }

  put(url: string, body: any, id: number) {
    const idMensaje = this.msg.loading(this.i18n.traducir('app.guardando')).messageId;
    return this.http.put(`${url}/${id}`, body).pipe(
      map((resp: any) => {
        this.msg.remove(idMensaje);
        this.msg.success(this.i18n.traducir('app.guardadoCorrecto'));
        return resp;
      }),
      catchError(err => {
        this.msg.remove(idMensaje);
        throwError(() => new Error(err));
        this.msg.error(this.i18n.traducir(err.error.errorTag), { nzDuration: 5000 });
        return err;
      })
    );
  }

  delete(url: string, id: number, openDialogAfterResult: boolean = true) {
    const idMensaje = this.msg.loading(this.i18n.traducir('app.guardando')).messageId;
    return this.http.delete(`${url}/${id}`).pipe(
      map(() => {
        if (openDialogAfterResult) {
          this.msg.remove(idMensaje);
          this.msg.success(this.i18n.traducir('app.eliminacionCorrecta'));
          return true;
        } else {
          return true;
        }
      }),
      catchError(err => {
        if (openDialogAfterResult) {
          this.msg.remove(idMensaje);
          this.msg.error(this.i18n.traducir(err.error.errorTag), { nzDuration: 5000 });
          throwError(() => new Error(err));
          return err;
        } else {
          this.msg.remove(idMensaje);
          throwError(() => new Error(err));
          this.msg.error(this.i18n.traducir(err.error.errorTag), { nzDuration: 5000 });
          return err;
        }
      })
    );
  }

  deleteWithValidation(url: string, id: number, openDialogAfterResult: boolean = true) {
    const idMensaje = this.msg.loading(this.i18n.traducir('app.guardando')).messageId;
    return this.http.delete(`${url}/${id}`).pipe(
      map(resp => {
        if (openDialogAfterResult && resp.correcte) {
          this.msg.remove(idMensaje);
          this.msg.success(this.i18n.traducir('app.eliminacionCorrecta'));
          return true;
        } else {
          this.msg.remove(idMensaje);
          return false;
        }
      }),
      catchError(err => {
        if (openDialogAfterResult) {
          this.msg.remove(idMensaje);
          this.msg.error(this.i18n.traducir(err.error.errorTag), { nzDuration: 5000 });
          throwError(() => new Error(err));
          return err;
        } else {
          this.msg.remove(idMensaje);
          throwError(() => new Error(err));
          this.msg.error(this.i18n.traducir(err.error.errorTag), { nzDuration: 5000 });
          return err;
        }
      })
    );
  }
}
