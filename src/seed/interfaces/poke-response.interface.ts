// usar interface cuando solo se le quiera poner el tipo a una respuesta
// Usar clase/entity cuando se haran manipulaciones a una data o algo asi

export interface PokeResponse {
  count:    number;
  next:     string;
  previous: null;
  results:  Result[];
}

export interface Result {
  name: string;
  url:  string;
}
