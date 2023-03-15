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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const dayjs_1 = __importDefault(require("dayjs"));
const getHospitalData = () => {
    const data = fs.readFileSync("hospitalData_latest.json", "utf-8");
    const parseJs = JSON.parse(data);
    return parseJs;
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
    const currentDate = (0, dayjs_1.default)(new Date());
    // date.hour() < 10 ? "0" +
    const convDate = currentDate.year().toString().slice(2, 4) +
        (currentDate.month() < 10
            ? "0" + (currentDate.month() + 1)
            : currentDate.month() + 1).toString() +
        currentDate.date();
    fs.writeFileSync(`hospitalData_${convDate}.json`, dataToJSON, "utf-8");
};
exports.default = hospitalDataFixer;
//# sourceMappingURL=jsonParser.js.map