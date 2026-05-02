import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { I18nPipe } from '@delon/theme';
import { environment } from '@env/environment';
import { I18NService, StartupService } from '../../../_infra/core';
import { SharedModule } from '../../../_infra/shared';
import { Utils } from '../../../_infra/shared/utils/Utils';
import { UserModel } from '../../../maestros/usuarios/models/user.model';
import { LoginForm } from '../../forms/login.form';
import { RoutingService } from 'src/app/_infra/shared/services/routings.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoaderService } from 'src/app/_infra/shared/components/carga/loader/loader.service';
import { SesionService } from '../../services/sesion.service';
import { DeviceService } from 'src/app/_infra/shared/services/device.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SesionService],
  standalone: true,
  imports: [ReactiveFormsModule, I18nPipe, SharedModule]
})
export class LoginComponent implements OnInit {
  emailRecuperar: string;
  loading: boolean;
  form: FormGroup;
  error = '';
  mostrarError: boolean = false;
  entorno: string;
  movil: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: RoutingService,
    private msg: NzMessageService,
    private i18n: I18NService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    private loaderService: LoaderService,
    public sesionService: SesionService,
    private deviceService: DeviceService
  ) {
    this.form = this.formBuilder.group(LoginForm);
    this.movil = this.deviceService.isMovil();
  }

  ngOnInit(): void {
    this.tokenService.clear();
    this.seleccionarEntorno();
  }

  recuperarPassword() {
    this.loaderService.show();
    this.loading = true;
    this.sesionService.recuperarContrasenya({ email: this.emailRecuperar }).subscribe({
      complete: () => {
        this.msg.success(this.i18n.traducir('app.resetPasswordCorrecto'), { nzDuration: 5000 });
        this.emailRecuperar = '';
        this.loaderService.hide();
        this.loading = false;
      },
      error: () => {
        this.loaderService.hide();
        this.loading = false;
      }
    });
  }

  validar() {
    if (
      (!this.form.controls['usuario'].value && this.form.controls['usuario'].dirty) ||
      (!this.form.controls['password'].value && this.form.controls['password'].dirty)
    ) {
      this.error = 'app.errorPrincipalFormulario';
      this.mostrarError = true;
    } else {
      this.mostrarError = false;
      this.error = '';
    }
  }

  acceder() {

    this.error = '';
    this.mostrarError = false;
    const datos = {
      secreto: environment.oauthSecretPass,
      username: this.form.controls['usuario'].value,
      password: this.form.controls['password'].value
    };

    Utils.validarCampos(this.form);
    if (this.form.invalid) {
      this.validar();
      return;
    }
    this.loaderService.show();
    this.loading = true;
    this.sesionService.login(datos).subscribe({
      complete: () => {
        this.loaderService.hide();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.loaderService.hide();
      },
      next: response => {
        const usuari = new UserModel().deserialize(response);
        this.loaderService.hide();
        this.iniciar(usuari);
      }
    });
  }

  iniciar(usuario: UserModel) {
    if (usuario.caducado) {
      this.router.navigateByUrl('sesion/cambio-contrasenya');
    }
    if (!usuario.correcto) {
      this.error = usuario.mensaje;
      this.mostrarError = true;
      return;
    }
    this.tokenService.set(usuario);
    this.startupSrv.load().subscribe(() => {
      let url = this.tokenService.referrer?.url || '/';
      if (url.includes('/sesion')) {
        url = '/';
      }
      this.router.navigateByUrl(url);
    });
  }

  seleccionarEntorno() {
    if (environment.entorno !== 'Prod') {
      this.entorno = environment.entorno;
    }
  }
}
