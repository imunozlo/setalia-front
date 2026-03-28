import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { I18NService } from '../../../../_infra/core';
import { CambioContrasenyaModel } from '../../models/cambio-contrasenya.model';
import { UserModel } from '../../models/user.model';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { RequisitosContrasenyaComponent } from '../../components/requisitos-contrasenya.component';
import { ContrasenyaFormularioConfig } from 'src/app/_infra/shared/components/formularios/configuraciones/user/contrasenya-formulario.config';
import { UsuariosContrasenyasService } from '../../services/usuarios-contrasenyas.service';

@Component({
  selector: 'app-drawer-cambi-contrasenya',
  templateUrl: 'dialog-cambio-contrasenya.component.html'
})
export class DialogCambioContrasenyaComponent implements OnInit, OnDestroy {
  usuari: UserModel;
  validacionCorrecta: boolean = false;
  abierto = false;
  titulo: string;
  model = new CambioContrasenyaModel().initialize();
  formulario = Object.assign([], ContrasenyaFormularioConfig);
  formularioValid: boolean;
  listasValores: any;
  errorFormularioText: string;
  errorFormulario: boolean;
  subbscripcions: Subject<void> = new Subject();
  @ViewChild('requisitos') requisitosContrasenyaComponent: RequisitosContrasenyaComponent;

  constructor(
    private i18n: I18NService,
    private modalRef: NzModalRef,
    public service: UsuariosContrasenyasService
  ) {}

  ngOnInit(): void {
    this.usuari = this.modalRef.getConfig().nzData;
  }

  guardar() {
    this.datosValidos();
    if (this.formularioValid) {
      this.service
        .cambiarContrasenya({ actual: this.model.actualContrasenya, nueva: this.model.nuevaContrasenya })
        .pipe(takeUntil(this.subbscripcions))
        .subscribe({
          complete: () => {
            this.cerrar();
          },
          error: () => {
            //this.cerrar();
          },
          next: () => {
            this.cerrar();
          }
        });
    }
  }

  datosValidos() {
    if (this.requisitosContrasenyaComponent) {
      this.errorFormulario = false;
      this.validacionCorrecta = true;
      const validacion = this.requisitosContrasenyaComponent.validarDatos(this.model.nuevaContrasenya, this.model.repetirContrasenya);
      this.errorFormulario = validacion.errorFormulario;
      this.validacionCorrecta = validacion.validacionCorrecta;
      this.errorFormularioText = validacion.errorFormularioText;
    }
  }

  abrir(elemento: UserModel): void {
    this.usuari = elemento;
    this.abierto = true;
    this.titulo = this.i18n.traducir('app.cambiarContrasenya');
  }

  cerrar(): void {
    this.modalRef.close();
  }

  ngOnDestroy() {
    this.subbscripcions.next();
  }
}
