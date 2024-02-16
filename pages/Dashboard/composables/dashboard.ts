import { colors } from "@/constants";
import type {
  IStructureSeries,
  IDataSetsSeries,
} from "@/pages/Dashboard/interfaces/environment.ts";

const tonsPerGGCoefficient = 1000;

export function useDashboard() {
  function getAreaStructure(structureSeriesForPieChart: IStructureSeries[]) {
    if (!structureSeriesForPieChart || !structureSeriesForPieChart) {
      return undefined;
    }

    const refAreaItem = structureSeriesForPieChart.find(
      ({ role }) => role === "REF_AREA",
    );

    if (!refAreaItem || !refAreaItem.values) {
      return undefined;
    }

    const areaStructure = refAreaItem.values.map(({ name }) => name);
    return areaStructure;
  }

  function getPieChartData(dataSetsSeries: IDataSetsSeries) {
    const data = [];
    const backgroundColor = [];
    const borderColor = [];
    let index = 0;

    for (const key in dataSetsSeries) {
      const rest = Object.entries(dataSetsSeries[key].observations)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map((item) => Math.round(item[1][0] * tonsPerGGCoefficient));

      data.push(rest[0]);
      backgroundColor.push(colors[index] || "#607274");
      borderColor.push(colors[index] || "#607274");
      index++;
    }
    return [{ data, backgroundColor, borderColor }];
  }

  function getDefaultChartData(
    dataSetsSeries: IDataSetsSeries,
    structureSeries: IStructureSeries[],
  ) {
    const areaStructure = getAreaStructure(structureSeries);

    const datasets = [];
    let index = 0;

    for (const key in dataSetsSeries) {
      const rest = Object.entries(dataSetsSeries[key].observations)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map((item) => Math.round(item[1][0] * tonsPerGGCoefficient));

      datasets.push({
        data: rest,
        label: areaStructure ? areaStructure[index] : "",
        backgroundColor: colors[index] || "#607274",
        borderColor: colors[index] || "#607274",
      });
      index++;
    }
    return datasets;
  }

  return {
    getAreaStructure,
    getPieChartData,
    getDefaultChartData,
  };
}
