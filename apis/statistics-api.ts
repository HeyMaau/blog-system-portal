import {RecordClient} from "~/utils/StatisticsConstants";
import {getFetchConfig} from "~/utils/fetch-config";

export function useCommitVisitRecord(pageName: string | null, componentName: string | null, eventName: string) {
  $fetch('/statistics/record', getFetchConfig('post', null, {
    page: pageName,
    component: componentName,
    event: eventName,
    client: RecordClient.CLIENT_NAME_DESKTOP
  }))
}
