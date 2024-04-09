import { useEventBus, useDebounceFn } from "@vueuse/core";
import { debounceTime } from "@/constants";
import type { IStructureSeries } from "@/interfaces/common.ts";

const { emit } = useEventBus("vue-use-event-bus");

export const showNotification = useDebounceFn((errors) => {
  const uniqueErrors: string[] = Array.from(new Set(errors));

  uniqueErrors.forEach((errorMessage) => {
    emit({
      type: "error",
      title: "Error",
      message: errorMessage,
      position: "bottom-right",
    });
  });

  errors = [];
}, debounceTime);

export function getAreaStructure(
  structureSeriesForPieChart: IStructureSeries[],
) {
  if (!structureSeriesForPieChart) {
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
