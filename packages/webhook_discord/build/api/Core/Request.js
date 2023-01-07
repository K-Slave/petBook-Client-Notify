Object.defineProperty(exports, "__esModule", { value: true });
const xhrFunctions_1 = require("../../axios/xhrFunctions");
class Request {
    constructor({ initBaseUrl, commonUri, client }) {
        this.initBaseUrl = "";
        this.commonUri = "";
        this.getParameters = ({ uri, pathParam, params, headerObj, isNeedQuery = true, }) => {
            return {
                requestURL: `${(0, xhrFunctions_1.getUrl)(`${typeof window === "undefined" ? this.initBaseUrl : ""}` +
                    `${this.commonUri}` +
                    `${uri || ""}` +
                    `${pathParam || ""}`)}${isNeedQuery ? (0, xhrFunctions_1.getQueryString)(params) : ""}`,
                requestHeaders: headerObj,
            };
        };
        this.getResult = async ({ requestMethod, requestURL, requestHeaders, body, }) => {
            const response = this.client &&
                (await this.client.request({
                    method: requestMethod,
                    url: requestURL,
                    data: body,
                    timeout: 10000,
                    headers: requestHeaders,
                }));
            if (response && response.request) {
                delete response.request;
            }
            const result = Object.assign(Object.assign({}, response), { request: {
                    requestMethod,
                    requestURL,
                    body,
                    timeout: 10000,
                    requestHeaders,
                } });
            return result;
        };
        this.initBaseUrl = initBaseUrl;
        this.commonUri = commonUri;
        this.client = client;
    }
}
exports.default = Request;
//# sourceMappingURL=Request.js.map