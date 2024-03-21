import { ref } from "vue";
import { defineStore } from "pinia";
import type { Ref } from "vue";
import api from "@/api";

import type {
  IParamsEnvironment,
  IDataSetsSeries,
  IStructureSeries,
} from "@/pages/Dashboard/interfaces/environment.ts";

export const useEnvironmentMapStore = defineStore("environmentMap", () => {
  const dataSetsSeriesForPieRelativeChart: Ref<IDataSetsSeries> = ref({});
  const structureSeriesForPieRelativeChart: Ref<IStructureSeries[]> = ref([]);

  async function readEnvironmentPieRelativeChart(
    elements: string,
    countries: string,
    params: IParamsEnvironment,
  ): Promise<void> {
    const response = await api.environment.readEnvironment(
      elements,
      countries,
      params,
    );

    dataSetsSeriesForPieRelativeChart.value = response.data.dataSets[0].series;
    structureSeriesForPieRelativeChart.value =
      response.data.structure.dimensions.series;
  }

  return {
    readEnvironmentPieRelativeChart,
    dataSetsSeriesForPieRelativeChart,
    structureSeriesForPieRelativeChart,
  };
});
