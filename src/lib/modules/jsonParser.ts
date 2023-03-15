import * as fs from "fs";
import dayjs from "dayjs";

const getHospitalData = () => {
  const data = fs.readFileSync("hospitalData_latest.json", "utf-8");
  const parseJs = JSON.parse(data);
  return parseJs as {
    n_id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    phoneNumber: string;
    opentime: string;
    animal: string;
  }[];
};

const hospitalDataFixer = () => {
  const hospitalData = getHospitalData();

  const fixedData = hospitalData.map((data) => {
    return {
      n_id: data.n_id,
      name: data.name,
      address: data.address,
      latitude: data.longitude,
      longitude: data.latitude,
    };
  });

  const dataToJSON = JSON.stringify(fixedData, null, 2);

  const currentDate = dayjs(new Date());

  // date.hour() < 10 ? "0" +
  const convDate =
    currentDate.year().toString().slice(2, 4) +
    (currentDate.month() < 10
      ? "0" + (currentDate.month() + 1)
      : currentDate.month() + 1
    ).toString() +
    currentDate.date();

  fs.writeFileSync(`hospitalData_${convDate}.json`, dataToJSON, "utf-8");
};

export default hospitalDataFixer;
