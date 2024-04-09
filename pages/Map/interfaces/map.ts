// INFO: WET, to reduce code coupling
export interface IDataSetsSeriesMap {
  [key: string]: {
    attributes: any[];
    annotations: any[];
    observations: {
      [key: string]: number[];
    };
  };
}

export interface IParamsEnvironmentMap {
  detail: string;
  startPeriod: string;
  endPeriod: string;
  dimensionAtObservation: string;
}
