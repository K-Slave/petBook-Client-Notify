import { AxiosInstance, AxiosRequestHeaders } from "axios";
import { getQueryString, getUrl } from "../../axios/xhrFunctions";

type AxiosMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestConstructorProps {
  initBaseUrl: string;
  commonUri: string;
  client: AxiosInstance;
}

export default class RequestCore {
  public initBaseUrl = "";

  public commonUri = "";

  public client: AxiosInstance;

  constructor({ initBaseUrl, commonUri, client }: RequestConstructorProps) {
    this.initBaseUrl = initBaseUrl;
    this.commonUri = commonUri;
    this.client = client;
  }

  public getParameters = <T>({
    uri,
    pathParam,
    params,
    headerObj,
    isNeedQuery = true,
  }: {
    uri?: string;
    pathParam?: string;
    params?: T;
    headerObj?: AxiosRequestHeaders;
    isNeedQuery?: boolean;
  }): {
    requestURL: string;
    requestHeaders: AxiosRequestHeaders | undefined;
  } => {
    return {
      requestURL: `${getUrl(
        `${typeof window === "undefined" ? this.initBaseUrl : ""}` +
          `${this.commonUri}` +
          `${uri || ""}` +
          `${pathParam || ""}`
      )}${isNeedQuery ? getQueryString(params) : ""}`,
      requestHeaders: headerObj,
    };
  };

  public getResult = async <T, P = undefined>({
    requestMethod,
    requestURL,
    requestHeaders,
    body,
  }: {
    requestURL: string;
    requestMethod: AxiosMethod;
    requestHeaders?: AxiosRequestHeaders;
    body?: P;
  }) => {
    const response =
      this.client &&
      (await this.client.request<T>({
        method: requestMethod,
        url: requestURL,
        data: body,
        timeout: 10000,
        headers: requestHeaders,
      }));
    if (response && response.request) {
      delete response.request;
    }

    const result = {
      ...response,
      request: {
        requestMethod,
        requestURL,
        body,
        timeout: 10000,
        requestHeaders,
      },
    };

    return result;
  };
}
