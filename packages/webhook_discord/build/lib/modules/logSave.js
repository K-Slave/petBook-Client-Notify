Object.defineProperty(exports, "__esModule", { value: true });
exports.logSave = void 0;
const __1 = require("../..");
const fsFunction_1 = require("../common/fsFunction");
const logSave = (msgObject, webhookClient) => {
    try {
        const localJSON = (0, fsFunction_1.getLocalData)();
        const msg = Object.assign(Object.assign({}, msgObject), { author: msgObject.author });
        if (msgObject && msgObject.channelId === "858929985279492129") {
            localJSON.push(msg);
            (0, fsFunction_1.setLocalData)(localJSON);
        }
    }
    catch (error) {
        if (webhookClient) {
            webhookClient.send(Object.assign(Object.assign({}, __1.botProfile), { content: `logSave 에서 에러발생\n${error}` }));
            console.error(error);
        }
    }
};
exports.logSave = logSave;
//# sourceMappingURL=logSave.js.map