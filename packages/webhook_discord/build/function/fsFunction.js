var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLocalData = exports.getLocalData = void 0;
const fs = __importStar(require("fs"));
const getLocalData = () => {
    /* JSON 파일을 string 형태로 읽어서 JSON 형태로 변환하여 읽음 */
    const dataBuffer = fs.readFileSync("logData.json", "utf-8");
    const convJSON = JSON.parse(dataBuffer);
    return convJSON;
};
exports.getLocalData = getLocalData;
const setLocalData = (data) => {
    /* JSON 파일을 string 형태로 저장함 */
    let logData = [];
    if (data && data.length > 100) {
        // 0 ~ 150
        logData = [...data.slice(data.length - 99, data.length - 1)];
    }
    else {
        logData = data;
    }
    const dataToJSON = JSON.stringify(logData, null, 2);
    fs.writeFileSync("logData.json", dataToJSON, "utf-8");
};
exports.setLocalData = setLocalData;
//# sourceMappingURL=fsFunction.js.map