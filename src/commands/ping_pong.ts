import { SlashCommandBuilder } from "discord.js";

// export const pingPong = {
//   data: new SlashCommandBuilder()
//     .setName("ping")
//     .setDescription("Replies with Pong!"),
//   async execute(interaction: any) {
//     await interaction.reply("Pong!");
//   },
// };

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction: any) {
    await interaction.reply("Pong!");
  },
};

// async execute(interaction) {
//   await interaction.reply('Pong'!)
// }
