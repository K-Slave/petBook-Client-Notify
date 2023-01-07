Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const webhookClient = new discord_js_1.WebhookClient({
    url: process.env.WEBHOOK_URL,
});
const embed = new discord_js_1.EmbedBuilder().setTitle("Hello petBook !").setColor(0x00ffff);
webhookClient.send({
    content: "Webhook test",
    username: "petBot",
    avatarURL: "https://cdn.discordapp.com/app-icons/1044621624864940163/87fe18353f90a7a4c275be945afc14e5.png?size=512",
    embeds: [embed],
});
// webhook.edit({
// 	name: 'Some-username',
// 	avatar: 'https://cdn.discordapp.com/app-icons/1044621624864940163/87fe18353f90a7a4c275be945afc14e5.png?size=512',
// 	channel: '222197033908436994',
// })
// 	.then(webhook => console.log(`Edited webhook ${webhook}`))
// 	.catch(console.error);
//# sourceMappingURL=webhook.js.map