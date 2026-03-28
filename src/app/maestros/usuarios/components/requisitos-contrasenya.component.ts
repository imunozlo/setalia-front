import { Component, OnInit } from '@angular/core';
import { ConfiguracionModel } from '../../configuracion/models/configuracion.model';
import { ConfiguracioService } from '../../configuracion/services/configuracion.service';
import { I18NService } from 'src/app/_infra/core';
import { Utils } from 'src/app/_infra/shared/utils/Utils';

@Component({
  selector: 'app-requisitos-contrasenya',
  templateUrl: 'requisitos-contrasenya.component.html'
})
export class RequisitosContrasenyaComponent implements OnInit {
  configuracion: ConfiguracionModel;

  constructor(
    private serviceConfiguracion: ConfiguracioService,
    private i18n: I18NService
  ) {}

  ngOnInit(): void {
    this.serviceConfiguracion.obtenerConfiguracionPasswords().subscribe(response => {
      this.configuracion = new ConfiguracionModel().deserialize(response);
    });
  }

  validarDatos(nuevaContrasenya: string, repetirContrasenya: string) {
    let errorFormulario = false;
    let validacionCorrecta = true;
    let errorFormularioText = '';
    if (nuevaContrasenya && repetirContrasenya) {
      //Comprobamos si son iguales
      if (nuevaContrasenya != repetirContrasenya) {
        errorFormularioText = this.i18n.traducir('validacion.iguales');
        errorFormulario = true;
        validacionCorrecta = false;
      }
      //Comprobamos la longitud
      if (nuevaContrasenya.length < this.configuracion.contrasenyaMinimoCaracteres) {
        errorFormularioText = this.i18n.traducir('validacion.password-correcto');
        errorFormulario = true;
        validacionCorrecta = false;
      }
      //Comprobamos si contiene alguna mayuscula
      if (!Utils.contieneMayuscula(nuevaContrasenya) && this.configuracion.contrasenyaValidarMayuscula) {
        errorFormularioText = this.i18n.traducir('validacion.password-falta-mayuscula');
        errorFormulario = true;
        validacionCorrecta = false;
      }
      //Comprobamos si contiene algun numero
      if (!/\d/.test(nuevaContrasenya) && this.configuracion.contrasenyaValidarNumero) {
        errorFormularioText = this.i18n.traducir('validacion.password-falta-numero');
        errorFormulario = true;
        validacionCorrecta = false;
      }
      //Comprobamos si contiene algun simbolo
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(nuevaContrasenya) && this.configuracion.contrasenyaValidarSimbolo) {
        errorFormularioText = this.i18n.traducir('validacion.password-falta-simbolo');
        errorFormulario = true;
        validacionCorrecta = false;
      }
    }
    return { errorFormulario, validacionCorrecta, errorFormularioText };
  }
}
