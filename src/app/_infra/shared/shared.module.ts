import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
import { AlainThemeModule } from '@delon/theme';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxEditorModule } from 'ngx-editor';
import { BotonComponent } from './components/botones/boton/boton.component';
import { EmptyComponent } from './components/carga/empty/empty.component';
import { LoaderFullComponent } from './components/carga/loader/loader-full.component';
import { LoaderComponent } from './components/carga/loader/loader.component';
import { SkeletonComponent } from './components/carga/skeleton/skeleton.component';
import { TituloDetalleComponent } from './components/detalles/titulo/titulo-detalle.component';
import { DialogConfirmacionComponent } from './components/dialogs/confirmacion/dialog-confirmacion.component';
import { EtiquetaComponent } from './components/inputs/etiqueta/etiqueta.component';
import { InputComponent } from './components/inputs/input/input.component';
import { InputCheckboxComponent } from './components/inputs/input-checkbox/input-checkbox.component';
import { InputDateComponent } from './components/inputs/input-date/input-date.component';
import { InputDateRangeComponent } from './components/inputs/input-date-range/input-date-range.component';
import { InputNumberComponent } from './components/inputs/input-number/input-number.component';
import { InputPasswordComponent } from './components/inputs/input-password/input-password.component';
import { InputSelectComponent } from './components/inputs/input-select/input-select.component';
import { InputSelectMultipleComponent } from './components/inputs/input-select-multiple/input-select-multiple.component';
import { InputSwitchComponent } from './components/inputs/input-switch/input-switch.component';
import { InputTextareaComponent } from './components/inputs/input-textarea/input-textarea.component';
import { InputUploadImageComponent } from './components/inputs/input-upload-image/input-upload-image.component';
import { TablaActivoComponent } from './components/tablas/tabla/activos/tabla-activo.component';
import { TablaBotoneraPrincipalComponent } from './components/tablas/tabla/botonera-principal/tabla-botonera-principal.component';
import { TablaBuscadorComponent } from './components/tablas/tabla/buscador/tabla-buscador.component';
import { ColumnasTablasComponent } from './components/tablas/tabla/columnas/columnas-tablas.component';
import { TablaFiltroMultiselectorComponent } from './components/tablas/tabla/filtro-multiselector/tabla-filtro-multiselector.component';
import { TituloComponent } from './components/titulo/titulo.component';
import { TablaExpandibleComponent } from './components/tablas/tabla/expandible/tabla-expandible.component';
import { MonedaFilterPipe } from './components/pipes/moneda.pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InputEditorComponent } from './components/inputs/input-editor/input-editor.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { InputSelectSearchComponent } from './components/inputs/input-select-search/input-select-search.component';
import { BotonGuardarComponent } from './components/botones/boton-guardar/boton-guardar.component';
import { AlertasComponent } from './components/formularios/components/alertas/alertas.component';
import { DetalleBotoneraPrincipalComponent } from './components/detalles/botonera/detalle-botonera-principal.component';
import { SHARED_ZORRO_MODULES } from './modulos/shared-zorro.module';
import { TablaTituloComponent } from './components/tablas/tabla/titulo/tabla-titulo.component';
import { FormulariosComponent } from './components/formularios/formularios.component';
import { PaginacionTablasComponent } from './components/tablas/tabla/botonera-secundaria/tabla-botonera-secundaria.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InputHourComponent } from './components/inputs/input-hour/input-hour.component';
import { MaskDirective } from './directives/mask.directive';
import { BotonExpandirComponent } from './components/botones/boton-expandir/boton-expandir.component';
import { HorasMinutosFilerPipe } from './components/pipes/horas-minutos.pipe';
import { EtiquetasComponent } from './components/etiquetas/etiquetas.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapsComponent } from './components/maps/maps.component';
import { BotoneraSecundariaComponent } from './components/detalles/botonera-secundaria/botonera-secundaria.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { DialogMensajesComponent } from '../layout/basico/components/header/components/dialog-mensajes/dialog-mensajes.component';
import { MovilPaginacionComponent } from './components/movil/paginacion/movil-paginacion.component';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { InputSelectTreeComponent } from './components/inputs/input-select-tree/input-select-tree.component';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TagsRelacionadasComponent } from './components/tags/tags-relacionadas/tags-relacionadas.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { ProbetaComponent } from './modulos/custom-icons/probeta/probeta.component';
import { FocusDirective } from './directives/focus.directive';
import { InputControlComponent } from './components/inputs/input-control/input-control.component';
import { CamposFormularioComponent } from './components/formularios/components/campos/campos-formulario.component';
import { GraficoComponent } from './components/graficos/grafico.component';
import { InputUploadFileComponent } from './components/inputs/input-upload-file/input-upload-file.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

const THIRDMODULES: Array<Type<any>> = [];
const CUSTOM_ICONS: Array<Type<any>> = [
  ProbetaComponent
];
const COMPONENTS: Array<Type<any>> = [
  InputComponent,
  InputControlComponent,
  DialogConfirmacionComponent,
  BotonComponent,
  TituloComponent,
  InputSelectComponent,
  InputUploadImageComponent,
  InputUploadFileComponent,
  LoaderComponent,
  LoaderFullComponent,
  InputDateComponent,
  InputCheckboxComponent,
  InputNumberComponent,
  InputDateRangeComponent,
  InputTextareaComponent,
  InputHourComponent,
  InputPasswordComponent,
  BotonGuardarComponent,
  EtiquetaComponent,
  ColumnasTablasComponent,
  TablaActivoComponent,
  TablaBotoneraPrincipalComponent,
  AlertasComponent,
  TablaBuscadorComponent,
  TablaTituloComponent,
  InputSelectMultipleComponent,
  TablaFiltroMultiselectorComponent,
  TituloDetalleComponent,
  PaginacionTablasComponent,
  DetalleBotoneraPrincipalComponent,
  InputSwitchComponent,
  EmptyComponent,
  SkeletonComponent,
  TablaExpandibleComponent,
  MonedaFilterPipe,
  HorasMinutosFilerPipe,
  InputEditorComponent,
  GraficoComponent,
  InputSelectSearchComponent,
  FormulariosComponent,
  MaskDirective,
  FocusDirective,
  BotonExpandirComponent,
  EtiquetasComponent,
  BotoneraSecundariaComponent,
  BreadcrumbComponent,
  MapsComponent,
  DialogMensajesComponent,
  MovilPaginacionComponent,
  InputSelectTreeComponent,
  TagsRelacionadasComponent,
  ProgressBarComponent,
  CamposFormularioComponent];
const DIRECTIVES: Array<Type<any>> = [];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule,
    DelonACLModule,
    DelonFormModule,
    ScrollingModule,
    NgxEditorModule,
    NgxChartsModule,
    DragDropModule,
    ...SHARED_ZORRO_MODULES,
    // third libs
    ...THIRDMODULES,
    NgOptimizedImage,
    NgxEditorModule,
    GoogleMapsModule,
    NgZorroAntdMobileModule,
    NzTreeSelectModule,
    NzIconModule,
    AngularSvgIconModule.forRoot(),
    NgxExtendedPdfViewerModule
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    ...CUSTOM_ICONS
  ],
  bootstrap: [DialogMensajesComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonACLModule,
    NzIconModule,
    DelonFormModule,
    ...SHARED_ZORRO_MODULES,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    ...CUSTOM_ICONS
  ]
})
export class SharedModule {}
