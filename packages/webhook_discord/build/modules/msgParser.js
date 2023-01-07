Object.defineProperty(exports, "__esModule", { value: true });
exports.msgParser = void 0;
const fsFunction_1 = require("../function/fsFunction");
const msgParser = (msgEvt) => {
    const logData = (0, fsFunction_1.getLocalData)().reverse();
    const parsedArr = [];
    const lastCommitEmbed = logData.find((log) => {
        const embedLog = log.embeds;
        if (embedLog.find((embed) => { var _a; return (_a = embed.title) === null || _a === void 0 ? void 0 : _a.includes("petBook-Client:fe"); })) {
            return true;
        }
        return false;
    });
    const buildEmbed = msgEvt.embeds[0];
    if (buildEmbed) {
        parsedArr.push(buildEmbed);
    }
    if (lastCommitEmbed &&
        lastCommitEmbed.embeds &&
        lastCommitEmbed.embeds.length > 0) {
        parsedArr.push(lastCommitEmbed.embeds.find((embed) => { var _a; return (_a = embed.title) === null || _a === void 0 ? void 0 : _a.includes("petBook-Client:fe"); }));
    }
    return parsedArr;
};
exports.msgParser = msgParser;
//# sourceMappingURL=msgParser.js.map