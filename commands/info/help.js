const discord = require("discord.js");
const config = require("../../config/config.json");
const ms = require("pretty-ms");
const { RichEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h", "Help"],
  category: "info",
  run: async (bot, message, args) => {

    const embed = new discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(`${config.name} | Help`)
      .setThumbnail((config.thumbnails[Math.floor(Math.random() * config.thumbnails.length)]))
      .addField("**[1] __Info__**", "```ini\n.userinfo\n.botinfo\n.buy```", true)
      .addField("**[2] __Tools__**", "```ini\n.config\n.change [setting] [true/false/text]\n.writeconfig\n.start\n.stop\n.restart```\n", true)
      //.addField("**[3] __Help Menus__**", "```ini\n.admin\n.reseller```", true)
      .setTimestamp()

      .setAuthor(bot.user.tag, bot.user.displayAvatarURL);
    message.channel.send(embed);
  }
}