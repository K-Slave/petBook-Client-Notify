Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDate = exports.parseDateString = void 0;
const parseDateString = (s) => {
    // const b = s.split(/\D+/);
    return new Date(Date.parse(s));
};
exports.parseDateString = parseDateString;
const isValidDate = (value) => {
    return value instanceof Date && !isNaN(value);
};
exports.isValidDate = isValidDate;
//# sourceMappingURL=parseISOString.js.map