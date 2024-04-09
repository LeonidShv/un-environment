import { colors, additionalColor, tonsPerGGCoefficient } from "@/constants";
import { getAreaStructure } from "@/helpers/index";
import type { IDataSetsSeries } from "@/pages/Dashboard/interfaces/environment";
import type { IStructureSeries } from "@/interfaces/common";

export function useDashboard() {
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
      backgroundColor.push(colors[index] || additionalColor);
      borderColor.push(colors[index] || additionalColor);
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
        backgroundColor: colors[index] || additionalColor,
        borderColor: colors[index] || additionalColor,
      });
      index++;
    }
    return datasets;
  }

  return {
    getPieChartData,
    getDefaultChartData,
  };
}
