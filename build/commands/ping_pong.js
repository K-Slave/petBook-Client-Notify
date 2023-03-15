Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
// export const pingPong = {
//   data: new SlashCommandBuilder()
//     .setName("ping")
//     .setDescription("Replies with Pong!"),
//   async execute(interaction: any) {
//     await interaction.reply("Pong!");
//   },
// };
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(interaction) {
        await interaction.reply("Pong!");
    },
};
// async execute(interaction) {
//   await interaction.reply('Pong'!)
// }
//# sourceMappingURL=ping_pong.js.map