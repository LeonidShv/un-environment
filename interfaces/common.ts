export interface ICountry {
  value: string;
  label: string;
  population: {
    [key: string]: number;
  };
  area: {
    [key: string]: number;
  };
}

export interface IElement {
  value: string;
  label: string;
}
