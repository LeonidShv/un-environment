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

interface StructureSeriesValuesItem {
  id: string;
  name: string;
}
export interface IStructureSeries {
  id: string;
  name: string;
  keyPosition: number;
  role: string;
  values: StructureSeriesValuesItem[];
}
