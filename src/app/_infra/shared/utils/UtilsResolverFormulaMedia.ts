import { UtilsFormulas } from './UtilsFormulas';


export class UtilsResolverFormulaMedia {

  static evaluarFormulaMedia(medidas: Array<any>, numeroDecimales: number) {
    let sumaValores = 0;
    let contadorValidos = 0;

    medidas.forEach((medida: any) => {
      // 1) Ignorar las medidas que son fórmulas
      if (medida?.formula !== null && medida?.formula !== undefined && medida?.formula !== '') {
        return; // saltamos esta medida
      }
      const valor = medida?.valor;
      // 2) Solo tener en cuenta las que tienen valor real asignado
      if (medida?.valor !== null && medida?.valor !== undefined && medida?.valor !== '') {
        let valorNumerico: number;

        // 3) Solo transformar si valor es string
        if (typeof valor === 'string') {
          valorNumerico = UtilsFormulas.transformarValorEnNumerico(valor);
        } else {
          valorNumerico = valor; // ya es number
        }
        sumaValores += valorNumerico;
        contadorValidos++;
      }
    });

    // Si no hay ninguna medida válida, devolvemos 0 (o lo que uséis por defecto)
    if (contadorValidos === 0) {
      return UtilsFormulas.formatearResultadoFormula(0, numeroDecimales);
    }

    const media = sumaValores / contadorValidos;
    return UtilsFormulas.formatearResultadoFormula(media, numeroDecimales);
  }

}
