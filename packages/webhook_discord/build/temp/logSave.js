Object.defineProperty(exports, "__esModule", { value: true });
exports.logSave = void 0;
const fsFunction_1 = require("../function/fsFunction");
const logSave = (msgObject) => {
    const localJSON = (0, fsFunction_1.getLocalData)();
    console.log(msgObject, "msgObject");
    if (msgObject) {
        localJSON.push(msgObject);
        (0, fsFunction_1.setLocalData)(localJSON);
    }
};
exports.logSave = logSave;
//# sourceMappingURL=logSave.js.map