import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ColumnaInterface } from '../components/tablas/models/columna.interface';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  abcd = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'AA',
    'AB',
    'AC',
    'AD',
    'AE',
    'AF',
    'AG',
    'AH',
    'AI',
    'AJ',
    'AK',
    'AL',
    'AM',
    'AN',
    'AO',
    'AP',
    'AQ',
    'AR',
    'AS',
    'AT',
    'AU',
    'AV',
    'AW',
    'AX',
    'AY',
    'AZ'
  ];

  public exportAsExcelFile(json: any[], excelFileName: string, header: any[]): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, { skipHeader: false });
    const workbook: XLSX.WorkBook = { Sheets: { Datos: worksheet }, SheetNames: ['Datos'] };
    this.generateHeader(header, workbook);
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  private generateHeader(header: any[], workBook: XLSX.WorkBook) {
    for (let i = 0; i < header.length; i++) {
      if (workBook.Sheets['Datos'][`${this.abcd[i]}1`]) {
        workBook.Sheets['Datos'][`${this.abcd[i]}1`].v = header[i];
      }
    }
  }

  public generateValueExport(dato: any, columna: ColumnaInterface) {
    if (columna.visibleExportacion) {
      return dato[columna.campo];
    }
  }

  getDescriptionMulti(values: number[], elements: any[]) {
    let description = '';
    if (values) {
      const elemento = elements.filter(ele => values.includes(ele.id));
      if (elemento && elemento.length > 0) {
        elemento.map(ele => {
          description = `${description + ele.descripcion}, `;
        });
        description = description.substring(0, description.length - 2);
      }
    }
    return description;
  }

  getDescriptionCadena(values: string[]) {
    let description = '';
    if (values) {
      values.map(value => {
        description = `${description + value} / `;
      });
      description = description.substring(0, description.length - 2);
    }
    return description;
  }

  getDateValid(dato: any, columna: ColumnaInterface): string | null {
    if (dato[columna.campo] === '') {
      return null;
    }
    const parsedDate = new Date(dato[columna.campo]);
    if (isNaN(parsedDate.getTime())) {
      return null;
    }
    const day = parsedDate.getDate().toString().padStart(2, '0');
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = parsedDate.getFullYear();
    return `${day}-${month}-${year}`;
  }

  getBooleanValue(dato: any, columna: ColumnaInterface): string | null {
    if (columna.visibleExportacion) {
      return dato[columna.campo] ? 'Si' : 'No';
    }
    return null;
  }

  getValueSort(config: any) {
    // @ts-ignore
    config.sort((a, b) => {
      if (a.order === undefined && b.order === undefined) {
        return 0; // Si ambos no tienen 'orden', no cambia el orden.
      } else if (a.order === undefined) {
        return 1; // Si 'a' no tiene 'orden', debe ir después de 'b'.
      } else if (b.order === undefined) {
        return -1; // Si 'b' no tiene 'orden', debe ir después de 'a'.
      } else {
        return a.order - b.order; // Si ambos tienen 'orden', se ordenan de menor a mayor.
      }
    });
    return config;
  }

  convertToNumber(value: any): number {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num; // Si no es un número válido, se retorna 0
  }

  exportar(titolDocument: string, fileExportConfig: any, elements: []) {
    let config = Object.assign([], fileExportConfig);
    config = this.getValueSort(config);

    const datosExportar = elements.map(item => {
      const fila: any = {};
      config.forEach((col: ColumnaInterface) => {
        if (col.visibleExportacion) {
          switch (col.tipoFiltro) {
            case 'boolean':
              fila[col.campo] = this.getBooleanValue(item, col);
              break;
            case 'date':
              fila[col.campo] = this.getDateValid(item, col);
              break;
            case 'number': // De momento no hay ningún valor de tipo number en la configuración. Lo que provoca en la exportación es que rellena los valores vacíos por 0
              fila[col.campo] = this.convertToNumber(item[col.campo]);
              break;
            default:
              fila[col.campo] = this.generateValueExport(item, col);
              break;
          }
        }
      });
      return fila;
    });
    // @ts-ignore
    const headers = config.filter(col => col.visibleExportacio).map(col => col.camp);
    this.exportAsExcelFile(datosExportar, titolDocument, headers);
  }
}
