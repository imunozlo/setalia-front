import { AbstractControl, FormGroup } from '@angular/forms';

import { ColumnaInterface } from '../components/tablas/models/columna.interface';


export class Utils {
  static ordenarTaula(ordenacioActual: string, campo: string, elementos: any[]) {
    if (ordenacioActual === 'ascend') {
      elementos.sort((a, b) =>
        this.normalizarCadena(a[campo]) > this.normalizarCadena(b[campo])
          ? 1
          : this.normalizarCadena(a[campo]) === this.normalizarCadena(b[campo])
            ? 0
            : -1
      );
    } else {
      elementos.sort((a, b) =>
        this.normalizarCadena(a[campo]) < this.normalizarCadena(b[campo])
          ? 1
          : this.normalizarCadena(a[campo]) === this.normalizarCadena(b[campo])
            ? 0
            : -1
      );
    }
  }

  static ordenar(ordenacio: any, columnas: ColumnaInterface[], columna: ColumnaInterface, elementos: any[]) {
    Utils.borrarOrdenaciones(columnas);
    columna.ordenOrdenacion = ordenacio;
    if (ordenacio !== null) {
      Utils.ordenarTaula(ordenacio, columna.campo, elementos);
    }
  }

  static ordenarColumna(ordenacio: any, columnas: ColumnaInterface[], columna: ColumnaInterface) {
    Utils.borrarOrdenaciones(columnas);
    columna.ordenOrdenacion = ordenacio;
    //if (ordenacio !== null) {
    //Utils.ordenarTaula(ordenacio, columna.campo, elementos);
    // }
  }

  static borrarOrdenaciones(columnas: ColumnaInterface[]) {
    columnas.map(ele => {
      ele.ordenOrdenacion = null;
    });
  }

  static esMayuscula(letra: string) {
    return letra === letra.toUpperCase();
  }

  static esLetra(caracter: string) {
    return /^[a-zA-Z]$/.test(caracter);
  }

  static contieneMayuscula(paraula: string) {
    let conte = false;
    for (let index = 0; index < paraula.length; index++) {
      const lletraActual = paraula.charAt(index);
      if (this.esLetra(lletraActual) && this.esMayuscula(lletraActual)) {
        conte = true;
      }
    }
    return conte;
  }

  static validarCampos(form: FormGroup) {
    Object.keys(form.controls).forEach(key => {
      if (form.controls[key].invalid) {
        // @ts-ignore
        const validador = form.controls[key].validator({} as AbstractControl);
        if (validador && validador['required']) {
          form.controls[key].markAsTouched();
          form.controls[key].markAsDirty();
          form.controls[key].setErrors({ required: true });
        }
      } else {
        form.controls[key].setErrors(null);
      }
    });
  }

  static filtrarElementos(valor: any, elementos: any[]) {
    const elemenoosFiltrados: any[] = [];
    if (elementos.length > 0) {
      const propiedades = Object.keys(elementos[0]);
      elementos.map(elemento => {
        let incluyeAlgo = false;
        propiedades.map(propiedad => {
          if (elemento[propiedad] && elemento[propiedad].toString().toLowerCase().includes(valor.toLowerCase())) {
            incluyeAlgo = true;
          }
        });
        if (incluyeAlgo) elemenoosFiltrados.push(elemento);
      });
    }
    return elemenoosFiltrados;
  }

  static normalizarCadena(cadena: any) {
    if (cadena && (cadena instanceof String || typeof cadena === 'string')) {
      return cadena
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    } else {
      return cadena;
    }
  }

  static transformarValorEnString(valor: string) {
    if (valor) {
      return valor.toString().split('.').join(',');
    } else {
      return '';
    }
  }

  static obtenerDiasPorMes(indexMes: number): number {
    const meses = [
      { id: 0, descripcion: 'enero', dias: 31 },
      { id: 1, descripcion: 'febrero', dias: 28 },
      { id: 2, descripcion: 'marzo', dias: 31 },
      { id: 3, descripcion: 'abril', dias: 30 },
      { id: 4, descripcion: 'mayo', dias: 31 },
      { id: 5, descripcion: 'junio', dias: 30 },
      { id: 6, descripcion: 'julio', dias: 31 },
      { id: 7, descripcion: 'agosto', dias: 31 },
      { id: 8, descripcion: 'septiembre', dias: 30 },
      { id: 9, descripcion: 'octubre', dias: 31 },
      { id: 10, descripcion: 'noviembre', dias: 30 },
      { id: 11, descripcion: 'diciembre', dias: 31 }
    ];
    return meses[indexMes].dias;
  }

  static obtenerMeses(): Array<any> {
    const meses = [
      { id: 0, descripcion: 'app.geeneroner' },
      { id: 1, descripcion: 'app.febrero' },
      { id: 2, descripcion: 'app.marzo' },
      { id: 3, descripcion: 'app.abril' },
      { id: 4, descripcion: 'app.mayo' },
      { id: 5, descripcion: 'app.junio' },
      { id: 6, descripcion: 'app.julio' },
      { id: 7, descripcion: 'app.agosto' },
      { id: 8, descripcion: 'app.setiembre' },
      { id: 9, descripcion: 'app.octubre' },
      { id: 10, descripcion: 'app.noviembre' },
      { id: 11, descripcion: 'app.diciembre' }
    ];
    return meses;
  }

  static obtenerAnyos(any: number): Array<any> {
    const anys = [];
    const inici = 2024;
    const final = any + 5;

    for (let i = inici; i <= final; i++) {
      anys.push({ id: i, descripcion: i.toString() });
    }

    return anys;
  }

  static obtenerDiferenciaDias(fecha1: Date, fecha2: Date): number {
    const diferenciaMs = Math.abs(fecha2.getTime() - fecha1.getTime());
    const dias = diferenciaMs / (1000 * 60 * 60 * 24);
    return Math.floor(dias);
  }

  b64toBlob(b64Data: string, contentType: string) {
    const byteCharacters = atob(b64Data);
    const sliceSize = 512;
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  obtenerPdf(response: any) {
    const file = this.b64toBlob(response.b64, 'application/pdf');
    const fileURL = URL.createObjectURL(file);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = fileURL;
    a.download = response.titulo + '.pdf';
    a.click();
    window.URL.revokeObjectURL(fileURL);
  }

  obtenerExcel(response: any) {
    const file = this.b64toBlob(response.b64, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const fileURL = URL.createObjectURL(file);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = fileURL;
    a.download = response.titulo + '.xlsx';
    a.click();
    window.URL.revokeObjectURL(fileURL);
  }

  obtenerWord(response: any) {
    const file = this.b64toBlob(response.b64, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    const fileURL = URL.createObjectURL(file);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = fileURL;
    a.download = response.titulo + '.docx';
    a.click();
    window.URL.revokeObjectURL(fileURL);
  }

  obtenerZip(response: any) {
    const file = this.b64toBlob(response.b64, 'application/`zip`');
    const fileURL = URL.createObjectURL(file);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = fileURL;
    a.download = response.titulo + '.zip';
    a.click();
    window.URL.revokeObjectURL(fileURL);
  }


}
