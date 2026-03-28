export interface FormularioCampoInterface {
  obligatorio: boolean;
  blank: boolean; //Indica si les columnas es deuen deixar buides
  oculto?: boolean;
  etiqueta: {
    nombre?: string;
    icono?: string;
    iconoHover?: string;
    bold?: boolean;
    tamanyo: number;
    class?: string;
  };
  input: {
    tipo?: string; //text, password, select, switch, number, date, [progress, etiquetas, textoSinInput(texto sin input) ]
    nombre?: string; //Nom del campo al formulario
    valor?: string; //Nom del campo que conte el valor en el model
    disabled?: boolean; //Indica si el campo esta deshabilitat
    mostrarHora?: boolean;
    disabledSelect?: boolean // Campo para habilitar/deshabilitar un select
    lista?: string; //Nom de la llista de valores nomes en tipo select
    listaDescripcion?: string;
    rows?: any; //l'utilitzem per a definir el tamanyo d'un campo de tipo textarea
    orden?: string; //Ordre dels desplegables
    tamanyo: number;
    ocultarNoActivos?: boolean // Campo para listar todos los elementos independientemente de si estan activos
    caracteresBusqueda?: number // Numero de caracteres para iniciar la busqueda en el select search
    step?: number; //Per definir el step en els inputs numbers
    min?: number; //Per definir el minim de un nombre
    max?: number; //Per definir el maxim de un nombre
    relacionado?: boolean; //indica si el campo te que emiter event perque esta relacionat amb altre
    fechaMaxima?: string;
    fechaMinima?: string;
    class?: string;
    mostrarTodas?: boolean // Indica si se mostraran todas las etiquetas o se mostrarn n, y un desplegable con el resto
    textoaMostar?: string; // Indica un texto que se mostrara por defecto en caso de que el tipo:textoSinInput venga vacío
    esFecha?: boolean; // Indica si el campo textoSinInput es de tipo fecha para aplicar una pipe
    esFechaHora?: boolean; // Indica si el campo textoSinInput es de tipo fecha para aplicar una pipe
  };
}
