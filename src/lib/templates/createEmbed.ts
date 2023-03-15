import { EmbedBuilder } from "discord.js";

const createEmbed = (embed: any) => {
  const newEmbed = new EmbedBuilder();

  if (embed.url) {
    newEmbed.setURL(embed.url);
  }

  if (embed.title) {
    newEmbed.setTitle(embed.title);
  }

  if (embed.description) {
    newEmbed.setDescription(embed.description);
  }

  if (embed.color) {
    newEmbed.setColor(embed.color);
  }

  if (embed.author) {
    newEmbed.setAuthor(embed.author);
  }

  return newEmbed;
};

export default createEmbed;
