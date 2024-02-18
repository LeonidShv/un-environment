export interface IParamsEnvironment {
  detail: string;
  startPeriod: string;
  endPeriod: string;
  dimensionAtObservation: string;
}

export interface IDataSetsSeries {
  [key: string]: {
    attributes: any[];
    annotations: any[];
    observations: {
      [key: string]: number[];
    };
  };
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
