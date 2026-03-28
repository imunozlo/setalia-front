import { Platform } from '@angular/cdk/platform';
import { registerLocaleData } from '@angular/common';
import ngEs from '@angular/common/locales/es';
import { Injectable } from '@angular/core';
import { _HttpClient, AlainI18nBaseService, DelonLocaleService, es_ES as delonEsES, SettingsService } from '@delon/theme';
import { AlainConfigService } from '@delon/util/config';
import { es as dfEs } from 'date-fns/locale';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { es_ES as zorroEsES, NzI18nService } from 'ng-zorro-antd/i18n';
import { Observable } from 'rxjs';

interface ConfiguracionIdioma {
  abreviatura: string;
  text: string;
  ng: NzSafeAny;
  zorro: NzSafeAny;
  data: NzSafeAny;
  delon: NzSafeAny;
}

const DEFAULT = 'es-CA';
const LANGS: { [key: string]: ConfiguracionIdioma } = {
  'es-CA': {
    text: 'Español',
    ng: ngEs,
    zorro: zorroEsES,
    data: dfEs,
    delon: delonEsES,
    abreviatura: 'es'
  }
};

@Injectable({ providedIn: 'root' })
export class I18NService extends AlainI18nBaseService {
  protected override _defaultLang = DEFAULT;
  private _idiomes = Object.keys(LANGS).map(code => {
    const item = LANGS[code];
    return { code, text: item.text, abbr: item.abreviatura, id: code };
  });

  constructor(
    private http: _HttpClient,
    private settings: SettingsService,
    private nzI18nService: NzI18nService,
    private delonLocaleService: DelonLocaleService,
    private platform: Platform,
    cogSrv: AlainConfigService
  ) {
    super(cogSrv);
    const defaultLang = this.obtenerIdiomaDefecto();
    this._defaultLang = this._idiomes.findIndex(w => w.code === defaultLang) === -1 ? DEFAULT : defaultLang;
  }

  private obtenerIdiomaDefecto(): string {
    if (!this.platform.isBrowser) {
      return DEFAULT;
    }
    if (this.settings.layout.lang) {
      return this.settings.layout.lang;
    }
    const res = (navigator.languages ? navigator.languages[0] : null) || navigator.language;
    const arr = res.split('-');
    return arr.length <= 1 ? res : `${arr[0]}-${arr[1].toUpperCase()}`;
  }

  obtenerDatosIdioma(lang: string): Observable<NzSafeAny> {
    return this.http.get(`assets/i18n/${lang}.json`);
  }

  use(lang: string, data: Record<string, unknown>): void {
    if (this._currentLang === lang) return;
    this._data = this.flatData(data, []);
    this.settings.layout['idiomas'] = data;
    const item = LANGS[lang];
    registerLocaleData(item.ng);
    this.nzI18nService.setLocale(item.zorro);
    this.nzI18nService.setDateLocale(item.data);
    this.delonLocaleService.setLocale(item.delon);
    this._currentLang = lang;
    this._change$.next(lang);
  }

  getLangs(): Array<{ code: string; text: string; abbr: string; id: string }> {
    return this._idiomes;
  }

  traducir(clave: string): string {
    const dato = this.settings.layout['idiomas'][clave];
    if (dato) {
      return dato;
    } else {
      return clave;
    }
  }
}
