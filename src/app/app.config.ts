import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, EnvironmentProviders, Provider } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  RouterFeatures,
  withComponentInputBinding,
  withHashLocation,
  withInMemoryScrolling,
  withViewTransitions
} from '@angular/router';
import { OverlayContainer, FullscreenOverlayContainer } from '@angular/cdk/overlay';

import { provideAuth } from '@delon/auth';
import { provideAlain } from '@delon/theme';
import { environment } from '@env/environment';
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { provideNgxMask } from 'ngx-mask';

import { defaultInterceptor, I18NService, provideStartup } from './_infra/core';
import { ICONS_AUTO } from './_infra/shared/modulos/style-icons-auto';
import { appRouting } from './app.routing';

const routerFeatures: RouterFeatures[] = [
  withComponentInputBinding(),
  withViewTransitions(),
  withInMemoryScrolling({ scrollPositionRestoration: 'top' })
];

const ngNotificacionConfig: NzConfig = {
  notification: { nzBottom: 40, nzPlacement: 'bottom' },
  message: { nzTop: '90vh' }
};

if (environment.useHash) routerFeatures.push(withHashLocation());

const providers: Array<Provider | EnvironmentProviders> = [
  provideHttpClient(withInterceptors([defaultInterceptor])),
  provideAnimations(),
  provideRouter(appRouting, ...routerFeatures),
  provideAlain({ i18nClass: I18NService, icons: [...ICONS_AUTO] }),
  provideAuth(),
  provideNzConfig(ngNotificacionConfig),
  provideStartup(),
  provideNgxMask(),

  {
    provide: OverlayContainer,
    useClass: FullscreenOverlayContainer
  }
];

export const appConfig: ApplicationConfig = {
  providers: providers
};
