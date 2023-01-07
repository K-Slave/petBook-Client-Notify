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
exports.waitPreArray = exports.botProfile = void 0;
const discord_js_1 = require("discord.js");
const dotenv = __importStar(require("dotenv"));
const logSave_1 = require("./lib/modules/logSave");
const embedParser_1 = require("./lib/modules/embedParser");
const envSelector_1 = __importDefault(require("./lib/modules/envSelector"));
const createEmbed_1 = __importDefault(require("./lib/templates/createEmbed"));
// import commandListner from "./listener/dist/commandListner";
dotenv.config();
// "길드"라는 용어는 Discord API와 discord.js에서 Discord 서버를 지칭하는 데 사용됩니다.
// define은 또한 Discord가 봇에 보내야 하는 이벤트를 정의하며 최소 이상을 활성화할 수 있습니다.
// define 항목 에서 다른 의도에 대해 자세히 읽을 수 있습니다.
// Create a new client instance
const env = (0, envSelector_1.default)("develop");
const productEnv = (0, envSelector_1.default)("product");
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildMessageTyping,
        discord_js_1.GatewayIntentBits.GuildWebhooks,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.DirectMessages,
    ],
});
const onLineEmbed = (0, createEmbed_1.default)({
    title: "봇이 활성화 되었어요",
    avatarURL: "https://cdn.discordapp.com/app-icons/1044621624864940163/87fe18353f90a7a4c275be945afc14e5.png?size=512",
    description: "야옹",
});
const webhookClient = new discord_js_1.WebhookClient({
    url: env.webhookURL,
});
exports.botProfile = {
    username: "petBot",
    avatarURL: "https://cdn.discordapp.com/app-icons/1044621624864940163/87fe18353f90a7a4c275be945afc14e5.png?size=512",
};
exports.waitPreArray = [];
client.on(discord_js_1.Events.ClientReady, (petBotClient) => {
    console.log(`Ready! Logged in as ${petBotClient.user.tag}`);
    petBotClient.channels
        .fetch(env.channelId)
        .then(async (textChannel) => {
        const hook = await client
            .fetchWebhook(productEnv.webhookId, productEnv.webhookToken)
            .catch((e) => {
            console.error(e);
            webhookClient.send(Object.assign(Object.assign({}, exports.botProfile), { content: `대상 채널에 webhook이 없거나 env 파일이 빠져있을수 있음` }));
        });
        webhookClient.send(Object.assign(Object.assign({}, exports.botProfile), { embeds: [onLineEmbed] }));
        if (!textChannel) {
            webhookClient.send(Object.assign(Object.assign({}, exports.botProfile), { content: "개발용 서버에 인식된 textChannel 없음" }));
            return;
        }
        textChannel === null || textChannel === void 0 ? void 0 : textChannel.client.on(discord_js_1.Events.MessageCreate, (msgCreateEvent) => {
            (0, logSave_1.logSave)(msgCreateEvent, webhookClient);
            if (msgCreateEvent.author.username === "petBot" &&
                msgCreateEvent.content.includes("빌드중...")) {
                const logedEmbeds = (0, embedParser_1.buildStartEmbed)(msgCreateEvent, webhookClient);
                if (!hook) {
                    webhookClient.send(Object.assign(Object.assign({}, exports.botProfile), { content: "개발용 채널에 인식된 webhook 없음" }));
                    return;
                }
                hook.send({
                    username: "petBot",
                    avatarURL: "https://cdn.discordapp.com/app-icons/1044621624864940163/87fe18353f90a7a4c275be945afc14e5.png?size=512",
                    embeds: logedEmbeds,
                });
            }
            if (msgCreateEvent.author.username === "petBot" &&
                msgCreateEvent.content.includes("빌드 성공")) {
                const logedEmbeds = (0, embedParser_1.buildSuccessEmbed)(msgCreateEvent, webhookClient);
                if (!hook) {
                    webhookClient.send(Object.assign(Object.assign({}, exports.botProfile), { content: "개발용 채널에 인식된 webhook 없음" }));
                    return;
                }
                const attachment = [...msgCreateEvent.attachments][0];
                hook.send({
                    username: "petBot",
                    avatarURL: "https://cdn.discordapp.com/app-icons/1044621624864940163/87fe18353f90a7a4c275be945afc14e5.png?size=512",
                    embeds: [...logedEmbeds],
                    files: [attachment[1]],
                });
            }
        });
    })
        .catch((e) => {
        console.error(e);
    });
});
// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
// commandListner(client);
//# sourceMappingURL=index.js.map