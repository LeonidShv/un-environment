export interface IParamsEnvironment {
  detail: string
  startPeriod: string
  endPeriod: string
  dimensionAtObservation: string
}

export interface IDataSetsSeries {
  [key: string]: {
    attributes: any[]
    annotations: any[]
    observations: {
      [key: string]: number[]
    }
  }
}

export interface IStructureSeries {
  id: string
  name: string
  keyPosition: number
  role: string
  values: StructureSeriesValuesItem[]
}

interface StructureSeriesValuesItem {
  id: string
  name: string
}

export interface ICountry {
  value: string
    label: string
    population: {
      [key: string]: number
    },
    area: {
      [key: string]: number
    }
}

export interface IElement {
  value: string
  label: string
}