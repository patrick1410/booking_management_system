import moment from "moment-timezone";

export const convertToLocal = (utcDateTime: Date | string) => {
  return moment.utc(utcDateTime).local().toDate(); // Converts to local time
};
