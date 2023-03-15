Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const createEmbed = (embed) => {
    const newEmbed = new discord_js_1.EmbedBuilder();
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
exports.default = createEmbed;
//# sourceMappingURL=createEmbed.js.map