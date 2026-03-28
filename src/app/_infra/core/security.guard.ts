import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ACLService } from '@delon/acl';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

export const securityGuard: CanActivateFn = (_activatedRoute): boolean | Observable<boolean> => {
  const aclService = inject(ACLService);
  let tieneAcceso = false;
  if (_.isEmpty(_activatedRoute.data)) {
    tieneAcceso = true;
  } else if (!_.isEmpty(_activatedRoute.data['guard'])) {
    const rolesGuard = _activatedRoute.data['guard'];
    tieneAcceso = aclService.can(rolesGuard);
  }
  //Redireccionamos si no hay acceso a la URL
  if (!tieneAcceso) {
    inject(Router).navigateByUrl('/dashboard');
  }
  return tieneAcceso;
};
