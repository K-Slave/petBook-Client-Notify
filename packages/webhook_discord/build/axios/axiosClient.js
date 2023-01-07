var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosClient = void 0;
const axios_1 = __importDefault(require("axios"));
const instance = axios_1.default.create();
instance.defaults.headers.common.Accept = "*/*";
exports.axiosClient = instance;
//# sourceMappingURL=axiosClient.js.map