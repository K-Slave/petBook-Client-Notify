import * as fs from "fs";

export const getLocalData = () => {
  /* JSON 파일을 string 형태로 읽어서 JSON 형태로 변환하여 읽음 */
  const dataBuffer = fs.readFileSync("logData.json", "utf-8");
  const convJSON = JSON.parse(dataBuffer);
  return convJSON as any[];
};

export const setLocalData = (data: Array<object>) => {
  /* JSON 파일을 string 형태로 저장함 */

  let logData: any[] = [];

  if (data && data.length > 100) {
    // 0 ~ 150
    logData = [...data.reverse().slice(0, data.length - 99)].reverse();
  } else {
    logData = data;
  }

  const dataToJSON = JSON.stringify(logData, null, 2);

  fs.writeFileSync("logData.json", dataToJSON, "utf-8");
};
