import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponseBase } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { catchError, mergeMap, Observable, of, throwError } from 'rxjs';

import { comprobarEstado, getAdditionalHeaders, obtenerMensajeError, ReThrowHttpError, volverLogin } from './errores';
import { UserModel } from '../../../maestros/usuarios/models/user.model';
import { I18NService } from '../i18n/i18n.service';

function errorHandler(injector: Injector, response: HttpErrorResponse): Observable<HttpEvent<any>> {
  switch (response.status) {
    case 401:
      volverLogin(injector);
      break;
    case 403:
      volverLogin(injector);
      break;
    case 404:
      obtenerMensajeError(injector, response);
      break;
    case 500:
      obtenerMensajeError(injector, response);
      break;
    default:
      break;
  }
  throw response;
}

function handleData(injector: Injector, ev: HttpResponseBase): Observable<any> {
  comprobarEstado(injector, ev);
  switch (ev.status) {
    case 200:
      break;
    default:
      break;
  }
  if (ev instanceof HttpErrorResponse) {
    return throwError(() => ev);
  } else if ((ev as unknown as ReThrowHttpError)._throw) {
    return throwError(() => (ev as unknown as ReThrowHttpError).body);
  } else {
    return of(ev);
  }
}

export const defaultInterceptor: HttpInterceptorFn = (req, next) => {
  //Datos iniciales
  const url = req.url;
  const tokenService = inject<ITokenService>(DA_SERVICE_TOKEN);
  const i18n = inject<I18NService>(I18NService);
  let idioma = i18n.defaultLang;
  if (i18n.currentLang) idioma = i18n.currentLang;
  const usuario = new UserModel().deserialize(tokenService.get());
  const token = usuario.token;
  const newReq = req.clone({ url, setHeaders: getAdditionalHeaders(req.headers) });
  let request;
  //Comprobaciones
  const esLlamadaLogin = req.toString().search('login') !== -1;
  const esLlamadaIdiomas = req.toString().search('idiomes/traduccions') !== -1;
  if (token && !esLlamadaLogin && !esLlamadaIdiomas) {
    request = newReq.clone({ url, headers: req.headers.set('Authorization', token).set('Lang', idioma) });
  } else {
    request = newReq.clone({ url, headers: req.headers.set('Lang', idioma) });
  }
  const injector = inject(Injector);
  return next(request).pipe(
    mergeMap(ev => {
      if (ev instanceof HttpResponseBase) {
        return handleData(injector, ev);
      }
      return of(ev);
    }),
    catchError(error => errorHandler(injector, error))
  );
};
