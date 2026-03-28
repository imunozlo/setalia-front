import { HttpErrorResponse, HttpHeaders, HttpResponseBase } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ALAIN_I18N_TOKEN } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';

import { I18NService } from '../i18n/i18n.service';

export interface ReThrowHttpError {
  body: any;
  _throw: true;
}

export const CODEMESSAGE: { [key: number]: string } = {
  200: 'Correcte',
  201: 'Correcte',
  202: 'Accepted',
  204: 'No content',
  400: 'Bad request',
  401: 'Unauthorized',
  403: 'Forbiden',
  404: 'Not found',
  406: 'Not aceptable',
  410: 'Gone',
  422: 'Unprocesable entity',
  500: 'Internal server error',
  502: 'Bag Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout'
};

export function irA(injector: Injector, url: string): void {
  //@ts-ignore
  setTimeout(() => injector.get(Router).navigateByUrl(url));
}

export function volverLogin(injector: Injector): void {
  injector.get(NzMessageService).error('Error', { nzDuration: 6000 });
  irA(injector, 'sesion/login');
}

export function getAdditionalHeaders(headers?: HttpHeaders): { [name: string]: string } {
  const res: { [name: string]: string } = {};
  const lang = inject(ALAIN_I18N_TOKEN).currentLang;
  if (!headers?.has('Accept-Language') && lang) {
    res['Accept-Language'] = lang;
  }

  return res;
}

export function comprobarEstado(injector: Injector, ev: HttpResponseBase): void {
  if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
    return;
  }
  const errortext = CODEMESSAGE[ev.status] || ev.statusText;
  injector.get(NzMessageService).error(errortext, { nzDuration: 6000 });
}

export function obtenerMensajeError(injector: Injector, response: HttpErrorResponse) {
  const i18n = injector.get(I18NService);
  let mensaje = '';
  if (response.error && response.error.mensajes && response.error.mensajes.length > 0) {
    response.error.mensajes.map((men: string) => {
      mensaje = mensaje + men;
    });
  } else if (response.error && response.error.errorInfo) {
    mensaje = response.error.errorInfo;
  } else if (response.error && response.error.errorTag) {
    mensaje = i18n.traducir(response.error.errorTag);
  }
  //injector.get(NzMessageService).error(mensaje, { nzDuration: 0 });
}
