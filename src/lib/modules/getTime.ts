import dayjs from "dayjs";

export const getFullTimeStr = (date: dayjs.Dayjs) => {
  return `${date.year()}년 ${(
    date.month() + 1
  ).toString()}/${date.date()}일 ${date.hour()}시${date.minute()}분`;
};

export const getStartTimeStr = (date: dayjs.Dayjs) => {
  return `${(date.month() + 1).toString()}/${date.date()} - ${
    date.hour() < 10 ? "0" + date.hour() : date.hour()
  }:${date.minute()}:${date.second()}`;
};
