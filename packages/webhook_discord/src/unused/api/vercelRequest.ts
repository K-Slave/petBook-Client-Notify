import { AxiosRequestHeaders } from "axios";
import RequestCore from "./Core/RequestCore";

export default class VercelReq extends RequestCore {
  public getHTML = async (config?: { headerObj?: AxiosRequestHeaders }) => {
    const { requestURL, requestHeaders } = this.getParameters({
      uri: "",
      headerObj: config && config.headerObj,
    });

    const result = await this.getResult({
      requestMethod: "GET",
      requestURL,
      requestHeaders,
    });

    return result;
  };
}
