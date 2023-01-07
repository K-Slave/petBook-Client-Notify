Object.defineProperty(exports, "__esModule", { value: true });
exports.authRequest = void 0;
const axiosClient_1 = require("./axiosClient");
exports.authRequest = new AuthAPI(process.env.NEXT_PUBLIC_SPR_URL, "/api/v1", axiosClient_1.axiosClient);
//# sourceMappingURL=index.js.map