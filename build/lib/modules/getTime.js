Object.defineProperty(exports, "__esModule", { value: true });
exports.getStartTimeStr = exports.getFullTimeStr = void 0;
const getFullTimeStr = (date) => {
    return `${date.year()}년 ${(date.month() + 1).toString()}/${date.date()}일 ${date.hour()}시${date.minute()}분`;
};
exports.getFullTimeStr = getFullTimeStr;
const getStartTimeStr = (date) => {
    return `${(date.month() + 1).toString()}/${date.date()} - ${date.hour() < 10 ? "0" + date.hour() : date.hour()}:${date.minute()}:${date.second()}`;
};
exports.getStartTimeStr = getStartTimeStr;
//# sourceMappingURL=getTime.js.map