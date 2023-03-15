Object.defineProperty(exports, "__esModule", { value: true });
exports.getVercelUpdated = exports.getPRCommitMsg = exports.getPushCommitMsg = exports.getLastCommitMsg = void 0;
// 둘중 마지막 메시지를 리턴함
// find 메서드 자체가 하나 찾으면 바로 리턴
const getLastCommitMsg = (logData) => {
    const lastFePush = logData.find((log) => {
        var _a, _b;
        const embedsLog = log.embeds[0];
        const authorLog = log.author;
        if (authorLog &&
            authorLog.username === "GitHub" &&
            (((_a = embedsLog.title) === null || _a === void 0 ? void 0 : _a.includes("petBook-Client:fe")) ||
                ((_b = embedsLog.title) === null || _b === void 0 ? void 0 : _b.includes("[K-Slave/petBook-Client] Pull request")))) {
            return true;
        }
        return false;
    });
    return lastFePush;
};
exports.getLastCommitMsg = getLastCommitMsg;
const getPushCommitMsg = (logData) => {
    const lastFePush = logData.find((log) => {
        var _a;
        const embedsLog = log.embeds[0];
        const authorLog = log.author;
        if (authorLog &&
            authorLog.username === "GitHub" &&
            ((_a = embedsLog.title) === null || _a === void 0 ? void 0 : _a.includes("petBook-Client:fe"))) {
            return true;
        }
        return false;
    });
    return lastFePush;
};
exports.getPushCommitMsg = getPushCommitMsg;
const getPRCommitMsg = (logData, authorName) => {
    const lastPR = logData.find((log) => {
        var _a, _b, _c;
        const embedsLog = log.embeds[0];
        const authorLog = log.author;
        if (authorLog &&
            authorLog.username === "GitHub" &&
            !((_a = embedsLog.title) === null || _a === void 0 ? void 0 : _a.includes("petBook-Client:fe")) &&
            ((_b = embedsLog.author) === null || _b === void 0 ? void 0 : _b.name) === authorName &&
            ((_c = embedsLog.title) === null || _c === void 0 ? void 0 : _c.includes("petBook-Client"))) {
            return true;
        }
        return false;
    });
    return lastPR;
};
exports.getPRCommitMsg = getPRCommitMsg;
const getVercelUpdated = (logData) => {
    const lastUpdated = logData.find((log) => {
        const content = log.content;
        if (content && content.includes("vercel updated")) {
            return true;
        }
        return false;
    });
    if (!lastUpdated) {
        return "";
    }
    return lastUpdated;
};
exports.getVercelUpdated = getVercelUpdated;
//# sourceMappingURL=getCommit.js.map