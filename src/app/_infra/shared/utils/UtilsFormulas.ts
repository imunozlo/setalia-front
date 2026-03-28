

export class UtilsFormulas {

  static evaluarFormula(formularConValores: string, numeroDecimales: number) {
    if (formularConValores.includes('[') || formularConValores.includes(']')) {
      return this.formatearResultadoFormula(0, numeroDecimales);
    } else {
      const formulaParseada = formularConValores.split(',').join('.');
      const valor = eval(formulaParseada);
      return this.formatearResultadoFormula(valor, numeroDecimales);
    }
  }

  static formatearResultadoFormula(resultado: number, numeroDecimales: number) {
    if (isNaN(resultado) || !isFinite(resultado)) {
      resultado = 0;
    }
    if (numeroDecimales && numeroDecimales > 0) {
      const final = resultado.toFixed(numeroDecimales);
      return this.transformarValorEnString(final);
    } else {
      return this.transformarValorEnString(resultado.toString());
    }
  }

  static transformarValorEnNumerico(valorString: string) {
    if (valorString) {
      return eval(valorString.split(',').join('.'));
    } else {
      return 0;
    }
  }

  static transformarValorEnString(valor: string) {
    if (valor) {
      return valor.toString().split('.').join(',');
    } else {
      return '';
    }
  }

  static transformarValorParaGuardar(valorString: string) {
    if (valorString) {
      return valorString.split(',').join('.');
    } else {
      return 0;
    }
  }

  static verSiIndicadorTieneMedida(indicadorRevisar: string) {
    const indicador = indicadorRevisar.split(':');
    return indicador[0];
  }

  static obtenerIndicadorSiEsMedidaConcreta(indicadorRevisar: string) {
    const indicador = indicadorRevisar.split(':');
    if (indicador[1]) {
      return indicador[1];
    } else {
      return '';
    }
  }

  static quedanMedidasPorReemplazar(formula: string) {
    const corcheteInicial = formula.indexOf('[');
    const corcheteFinal = formula.indexOf(']');
    if (corcheteFinal > -1 && corcheteInicial > -1) {
      return true;
    } else {
      return false;
    }
  }

  static obtenerNumeroIndicadoresEnFormula(formula: string) {
    let numeroIndicadores = 0;
    while (UtilsFormulas.quedanMedidasPorReemplazar(formula)) {
      const corcheteInicial = formula.indexOf('[');
      const corcheteFinal = formula.indexOf(']');
      if (corcheteInicial > -1 && corcheteFinal > -1) {
        const diferenciaIndices = corcheteFinal - corcheteInicial;
        let indicadorABuscarReemplazo = formula.substr(corcheteInicial + 1, diferenciaIndices - 1);
        indicadorABuscarReemplazo = UtilsFormulas.verSiIndicadorTieneMedida(indicadorABuscarReemplazo);
        const indicadoConcreto = formula.substr(corcheteInicial, diferenciaIndices + 1);
        formula = formula.replace(indicadoConcreto, '1');
      }
      numeroIndicadores += 1;
    }
    return numeroIndicadores;
  }

  static esFormulaDeTipoMedia(medida: any) {
    if (medida.formula && medida.formula.includes('MEDIA')) {
      return true;
    } else {
      return false;
    }
  }

  static esFormulaDeTipoCalculo(medida: any) {
    if (medida.formula && medida.formula.includes('CALCULO;')) {
      return true;
    } else {
      return false;
    }
  }

}
