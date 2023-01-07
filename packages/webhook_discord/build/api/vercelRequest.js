var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestCore_1 = __importDefault(require("./Core/RequestCore"));
class VercelReq extends RequestCore_1.default {
    constructor() {
        super(...arguments);
        this.getHTML = async (config) => {
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
}
exports.default = VercelReq;
//# sourceMappingURL=vercelRequest.js.map