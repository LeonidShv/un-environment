import { getAreaStructure } from "@/helpers/index";
import { tonsPerGGCoefficient } from "@/constants";
import type { IDataSetsSeriesMap } from "@/pages/Map/interfaces/map";
import type { IStructureSeries } from "@/interfaces/common";

export function useMap() {
  function getMapChartData(
    dataSetsSeries: IDataSetsSeriesMap,
    structureSeries: IStructureSeries[],
  ) {
    const areaStructure = getAreaStructure(structureSeries);

    const data = [["Country", "Element ton"]];
    let index = 0;

    for (const key in dataSetsSeries) {
      const rest = Object.entries(dataSetsSeries[key].observations)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map((item) => Math.round(item[1][0] * tonsPerGGCoefficient));

      data.push([areaStructure[index], rest[0]]);
      index++;
    }
    return data;
  }

  return {
    getMapChartData,
  };
}
