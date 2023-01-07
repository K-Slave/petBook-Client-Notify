Object.defineProperty(exports, "__esModule", { value: true });
exports.logSave = void 0;
const fsFunction_1 = require("../function/fsFunction");
const logSave = (msgObject) => {
    const localJSON = (0, fsFunction_1.getLocalData)();
    const msg = Object.assign(Object.assign({}, msgObject), { author: msgObject.author });
    if (msgObject && msgObject.channelId === "858929985279492129") {
        localJSON.push(msg);
        (0, fsFunction_1.setLocalData)(localJSON);
    }
};
exports.logSave = logSave;
//# sourceMappingURL=logSave.js.map