import {RecordClient} from "./StatisticsConstants";

export function useCommitVisitRecord(axios, pageName, eventName) {
  axios.post('/statistics/record', {
    page: pageName,
    event: eventName,
    client: RecordClient.CLIENT_NAME_DESKTOP
  })
}



