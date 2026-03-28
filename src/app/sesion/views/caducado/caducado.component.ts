import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nPipe } from '@delon/theme';

import { SharedModule } from '../../../_infra/shared';
import { UserModel } from '../../../maestros/usuarios/models/user.model';
import { SesionService } from '../../services/sesion.service';
import { CambioContrasenyaModel } from 'src/app/maestros/usuarios/models/cambio-contrasenya.model';
import { Subject, takeUntil } from 'rxjs';
import { I18NService } from 'src/app/_infra/core';
import { ContrasenyaCaducadaFormularioConfig } from 'src/app/_infra/shared/components/formularios/configuraciones/user/contrasenya-caducada-formulario.config';
import { UserModule } from 'src/app/maestros/usuarios/user.module';
import { RequisitosContrasenyaComponent } from 'src/app/maestros/usuarios/components/requisitos-contrasenya.component';

@Component({
  templateUrl: './caducado.component.html',
  styleUrls: ['./caducado.component.less'],
  providers: [SesionService],
  standalone: true,
  imports: [ReactiveFormsModule, I18nPipe, UserModule, SharedModule]
})
export class CaducadoComponent implements OnDestroy {
  usuario: UserModel;
  validacionCorrecta: boolean = false;
  abierto = false;
  titulo: string;
  model = new CambioContrasenyaModel().initialize();
  formulario = Object.assign([], ContrasenyaCaducadaFormularioConfig);
  formularioValid: boolean;
  listasValores: any;
  errorFormularioText: string;
  errorFormulario: boolean;
  subbscripcions: Subject<void> = new Subject();
  @ViewChild('requisitos') requisitosContrasenyaComponent: RequisitosContrasenyaComponent;

  constructor(
    private i18n: I18NService,
    private router: Router,
    public service: SesionService
  ) {}

  guardar() {
    this.datosValidos();
    if (this.formularioValid) {
      this.service
        .actualizarContrasenya({ usuario: this.model.usuario, actual: this.model.actualContrasenya, nova: this.model.nuevaContrasenya })
        .pipe(takeUntil(this.subbscripcions))
        .subscribe({
          complete: () => {
            this.router.navigateByUrl('sesion/login');
          },
          error: () => {},
          next: () => {
            this.router.navigateByUrl('sesion/login');
          }
        });
    }
  }

  datosValidos() {
    this.errorFormulario = false;
    this.validacionCorrecta = true;
    const validacion = this.requisitosContrasenyaComponent.validarDatos(this.model.nuevaContrasenya, this.model.repetirContrasenya);
    this.errorFormulario = validacion.errorFormulario;
    this.validacionCorrecta = validacion.validacionCorrecta;
    this.errorFormularioText = validacion.errorFormularioText;
  }

  ngOnDestroy() {
    this.subbscripcions.next();
  }
}
