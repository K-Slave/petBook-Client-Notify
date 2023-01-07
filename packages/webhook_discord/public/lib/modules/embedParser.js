var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSuccessEmbed = exports.buildStartEmbed = exports.CIResultEmbed = exports.githubEventTimeStamped = void 0;
const fsFunction_1 = require("../common/fsFunction");
const createEmbed_1 = __importDefault(require("../templates/createEmbed"));
const dayjs_1 = __importDefault(require("dayjs"));
const __1 = require("../..");
const getCommit_1 = require("./getCommit");
const getTime_1 = require("./getTime");
// import utc from "dayjs/plugin/utc";
// import timezone from "dayjs/plugin/timezone";
const githubEventTimeStamped = (msgEvt, webhookClient) => {
    const parsedArr = [];
    try {
        const githubEmbed = [...msgEvt.embeds][0];
        if (githubEmbed && msgEvt) {
            const date = (0, dayjs_1.default)(msgEvt.createdTimestamp);
            const lastUpdatedTime = (0, getTime_1.getStartTimeStr)(date);
            if (githubEmbed.description) {
                const desc = `💡 코드에 문제가 있는지 검사 시작.. : ${lastUpdatedTime}\n\n${githubEmbed.description}`;
                const sendEmbed = (0, createEmbed_1.default)(Object.assign(Object.assign({}, githubEmbed.data), { author: githubEmbed.author, description: desc }));
                parsedArr.push(sendEmbed);
            }
            else {
                parsedArr.push(githubEmbed);
            }
        }
    }
    catch (error) {
        if (webhookClient) {
            webhookClient.send(Object.assign(Object.assign({}, __1.botProfile), { content: `githubEventTimeStamped 에서 에러발생\n${error}` }));
            console.error(error);
        }
    }
    return parsedArr;
};
exports.githubEventTimeStamped = githubEventTimeStamped;
const CIResultEmbed = (msgEvt, kind, webhookClient) => {
    const logData = (0, fsFunction_1.getLocalData)().reverse();
    const parsedArr = [];
    try {
        const CIEmbed = [...msgEvt.embeds][0];
        let embedDesc = CIEmbed.description;
        let CIProcessResult = "";
        // 시작시간이 적힌 Msg 가 잡힐것임
        let lastMsg = undefined;
        if (kind === "PR") {
            lastMsg = (0, getCommit_1.getPRCommitMsg)(logData);
        }
        if (kind === "PUSH") {
            lastMsg = (0, getCommit_1.getPushCommitMsg)(logData);
        }
        if (CIEmbed && lastMsg) {
            const lastMsgCreatedTime = (0, dayjs_1.default)(lastMsg.createdTimestamp);
            const CIMsgCreatedTime = (0, dayjs_1.default)(msgEvt.createdTimestamp);
            const minDiff = CIMsgCreatedTime.diff(lastMsgCreatedTime, "m");
            const secDiff = (CIMsgCreatedTime.diff(lastMsgCreatedTime, "s", true) % 60).toFixed(3);
            CIProcessResult = `${minDiff > 0 ? minDiff + "m " : ""}${secDiff}s`;
            if (CIEmbed.description) {
                embedDesc = CIEmbed.description.replace("??", CIProcessResult ? CIProcessResult : "시간 계산 에러 발생");
            }
            const sendEmbed = (0, createEmbed_1.default)(Object.assign(Object.assign({}, CIEmbed.data), { author: CIEmbed.author, description: embedDesc }));
            parsedArr.push(sendEmbed);
        }
    }
    catch (error) {
        if (webhookClient) {
            webhookClient.send(Object.assign(Object.assign({}, __1.botProfile), { content: `CIResultEmbed 에서 에러발생\n${error}` }));
            console.error(error);
        }
    }
    return parsedArr;
};
exports.CIResultEmbed = CIResultEmbed;
const buildStartEmbed = (msgEvt, webhookClient) => {
    const logData = (0, fsFunction_1.getLocalData)().reverse();
    const parsedArr = [];
    try {
        let lastUpdatedTime = "";
        const buildEmbed = [...msgEvt.embeds][0];
        let embedDesc = buildEmbed.description;
        // TODO : 현재는 내 레포에서 fork sync 되야지만 배포되므로 이렇게 해두었음
        const lastUpdateMessage = (0, getCommit_1.getVercelUpdated)(logData) || (0, getCommit_1.getPushCommitMsg)(logData);
        if (buildEmbed && lastUpdateMessage) {
            const date = (0, dayjs_1.default)(lastUpdateMessage.createdTimestamp);
            if (date) {
                lastUpdatedTime = `${date.year()}년 ${(date.month() + 1).toString()}/${date.date()}일 ${date.hour()}시${date.minute()}분`;
            }
            if (buildEmbed.description) {
                embedDesc = buildEmbed.description.replace("??", lastUpdatedTime ? lastUpdatedTime : "로그 안에 존재하지 않음");
                const sendEmbed = (0, createEmbed_1.default)(Object.assign(Object.assign({}, buildEmbed.data), { description: embedDesc }));
                parsedArr.push(sendEmbed);
            }
            else {
                parsedArr.push(buildEmbed);
            }
        }
        // if (
        //   lastUpdateMessage &&
        //   lastUpdateMessage.embeds &&
        //   lastUpdateMessage.embeds.length > 0
        // ) {
        //   const foundEmbeds = lastUpdateMessage.embeds.find((embed: Embed) =>
        //     embed.title?.includes("petBook-Client:fe")
        //   );
        //   if (foundEmbeds) {
        //     parsedArr.push(foundEmbeds);
        //   }
        // }
    }
    catch (error) {
        if (webhookClient) {
            webhookClient.send(Object.assign(Object.assign({}, __1.botProfile), { content: `buildStartEmbed 에서 에러발생\n${error}` }));
            console.error(error);
        }
    }
    return parsedArr;
};
exports.buildStartEmbed = buildStartEmbed;
const buildSuccessEmbed = (msgEvt, webhookClient) => {
    var _a, _b;
    const logData = (0, fsFunction_1.getLocalData)().reverse();
    const parsedArr = [];
    try {
        let buildTimeResult = "";
        const buildEmbed = [...msgEvt.embeds][0];
        let embedDesc = buildEmbed.description;
        const buildStartContent = (_a = logData.find((log) => {
            const contentLog = log.content;
            if (contentLog.includes("시작시간")) {
                return true;
            }
            return false;
        })) === null || _a === void 0 ? void 0 : _a.content;
        const buildEndContent = (_b = logData.find((log) => {
            const contentLog = log.content;
            if (contentLog.includes("종료시간")) {
                return true;
            }
            return false;
        })) === null || _b === void 0 ? void 0 : _b.content;
        if (buildEmbed) {
            if (buildStartContent && buildEndContent) {
                const buildStarted = buildStartContent.slice(15, buildStartContent.length);
                const buildEnded = buildEndContent.slice(13, buildEndContent.length);
                const buildStartDate = (0, dayjs_1.default)(buildStarted);
                const buildEndDate = (0, dayjs_1.default)(buildEnded);
                const buildMinTime = buildEndDate.diff(buildStartDate, "m");
                const buildSecTime = (buildEndDate.diff(buildStartDate, "s", true) % 60).toFixed(3);
                buildTimeResult = `${buildMinTime > 0 ? buildMinTime + "m " : ""}${buildSecTime}s`;
            }
            if (buildEmbed.description) {
                embedDesc = buildEmbed.description.replace("??", buildTimeResult ? buildTimeResult : "??");
                const sendEmbed = (0, createEmbed_1.default)(Object.assign(Object.assign({}, buildEmbed.data), { description: embedDesc }));
                const productLink = (0, createEmbed_1.default)({
                    url: "https://www.petbook.site/",
                    type: "link",
                    title: "사이트 확인하기 : https://www.petbook.site/",
                    description: "배포 로깅 확인하기 : 현재는 지원되지 않아요",
                    // https://vercel.com/steven-yn/pet-book-client/deployments
                });
                parsedArr.push(sendEmbed);
                parsedArr.push(productLink);
            }
            else {
                parsedArr.push(buildEmbed);
            }
        }
    }
    catch (error) {
        if (webhookClient) {
            webhookClient.send(Object.assign(Object.assign({}, __1.botProfile), { content: `buildSuccessEmbed 에서 에러발생 ${error}` }));
            console.error(error);
        }
    }
    return parsedArr;
};
exports.buildSuccessEmbed = buildSuccessEmbed;
//# sourceMappingURL=embedParser.js.map