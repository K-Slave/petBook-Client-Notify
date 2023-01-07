var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAxiosItems = exports.getQueryString = exports.getUrl = void 0;
const qs_1 = __importDefault(require("qs"));
// baseURL + 사용자 정의 url + 사용자 정의 queryParams
// ex: "https://@@@.com" + "/board" + "?id=0&category_id=0&visible_status=Y&currentPage=1&numPerPage=10"
function getUrl(url) {
    if (url.includes("/"))
        return url;
    if (!url.includes("/"))
        return `/${url}`;
    return "";
}
exports.getUrl = getUrl;
function getQueryString(params) {
    if (!params)
        return "";
    if (typeof params === "string")
        return `?${params}`;
    if (typeof params === "object")
        return `?${qs_1.default.stringify(params)}`;
    return "";
}
exports.getQueryString = getQueryString;
// 인스턴스에 정의된 defaults.headers.common 객체와
// 인자로 받은 headerObj 를 spread 하여 객체로 반환
// ex : {
//   (this.defaults.headers.common 객체)
//   ...{
//     "Content-Type": "application/json",
//     "X-CSRFToken": "",
//   },
//   (인자로 받은 headerObj 객체)
//   ...{
//     'Content-Length' : '9999'
//   }
// }
function getHeaders(headerObj) {
    return Object.assign({}, headerObj);
}
function getParameters({ uri, baseURL, params, headerObj, isNeedQuery = true, }) {
    if (headerObj) {
        return {
            requestURL: `${baseURL || ""}${getUrl(uri)}${isNeedQuery ? getQueryString(params) : ""}`,
            requestHeaders: getHeaders(headerObj),
        };
    }
    return {
        requestURL: `${baseURL || ""}${getUrl(uri)}${isNeedQuery ? getQueryString(params) : ""}`,
    };
}
exports.default = getParameters;
function getAxiosItems(uri, instance) {
    return { uri, client: instance };
}
exports.getAxiosItems = getAxiosItems;
//# sourceMappingURL=xhrFunctions.js.map