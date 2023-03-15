Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDate = exports.parseDateString = void 0;
const parseDateString = (s) => {
    return new Date(Date.parse(s));
};
exports.parseDateString = parseDateString;
const isValidDate = (value) => {
    return value instanceof Date && !isNaN(value);
};
exports.isValidDate = isValidDate;
//# sourceMappingURL=parseDateString.js.map