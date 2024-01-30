interface IPieDataset {
  backgroundColor: string[];
  borderColor: string[];
  data: number[];
}
export interface IChartPie {
  labels: string[] | undefined;
  datasets: IPieDataset[];
}

interface IDefaultDataset {
  backgroundColor: string;
  borderColor: string;
  data: number[];
  label: string;
}
export interface IChartDefault {
  labels: string[];
  datasets: IDefaultDataset[];
}
