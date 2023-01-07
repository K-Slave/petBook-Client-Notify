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
Object.defineProperty(exports, "__esModule", { value: true });
const functions = __importStar(require("firebase-functions"));
const discord_js_1 = require("discord.js");
const webhookClient = new discord_js_1.WebhookClient({
    url: functions.config().discord_hook.url,
});
const embed = new discord_js_1.EmbedBuilder().setTitle("Hello petBook !").setColor(0x00ffff);
webhookClient.send({
    content: "Webhook test",
    username: "yoon0cean",
    avatarURL: "",
    embeds: [embed],
});
// webhook.edit({
// 	name: 'Some-username',
// 	avatar: 'https://i.imgur.com/AfFp7pu.png',
// 	channel: '222197033908436994',
// })
// 	.then(webhook => console.log(`Edited webhook ${webhook}`))
// 	.catch(console.error);
//# sourceMappingURL=webhook.js.map