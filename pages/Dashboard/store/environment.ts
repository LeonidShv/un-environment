import { ref } from "vue";
import { defineStore } from "pinia";
import type { Ref } from "vue";
import api from "@/api";

import type {
  IParamsEnvironment,
  IDataSetsSeries,
  IStructureSeries,
} from "@/pages/Dashboard/interfaces/environment.ts";

export const useEnvironmentStore = defineStore("environment", () => {
  const dataSetsSeriesForDefaultChart: Ref<IDataSetsSeries> = ref({});
  const structureSeriesForDefaultChart: Ref<IStructureSeries[]> = ref([]);

  async function readEnvironmentDefaultChart(
    elements: string,
    countries: string,
    params: IParamsEnvironment,
  ): Promise<void> {
    const response = await api.environment.readEnvironment(
      elements,
      countries,
      params,
    );

    dataSetsSeriesForDefaultChart.value = response.data.dataSets[0].series;
    structureSeriesForDefaultChart.value =
      response.data.structure.dimensions.series;
  }

  const dataSetsSeriesForPieChart: Ref<IDataSetsSeries> = ref({});
  const structureSeriesForPieChart: Ref<IStructureSeries[]> = ref([]);

  async function readEnvironmentPieChart(
    elements: string,
    countries: string,
    params: IParamsEnvironment,
  ): Promise<void> {
    const response = await api.environment.readEnvironment(
      elements,
      countries,
      params,
    );

    dataSetsSeriesForPieChart.value = response.data.dataSets[0].series;
    structureSeriesForPieChart.value =
      response.data.structure.dimensions.series;
  }

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
    readEnvironmentDefaultChart,
    dataSetsSeriesForDefaultChart,
    structureSeriesForDefaultChart,

    readEnvironmentPieChart,
    dataSetsSeriesForPieChart,
    structureSeriesForPieChart,

    readEnvironmentPieRelativeChart,
    dataSetsSeriesForPieRelativeChart,
    structureSeriesForPieRelativeChart,
  };
});
