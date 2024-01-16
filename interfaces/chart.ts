export interface IChartPie {
  labels: string[]
  datasets: IPieDataset[]
}

interface IPieDataset {
  backgroundColor: string[]
  borderColor: string[]
  data: number[]
}

export interface IChartDefault {
  labels: string[]
  datasets: IDefaultDataset[]
}

interface IDefaultDataset {
  backgroundColor: string
  borderColor: string
  data: number[]
  label: string
}