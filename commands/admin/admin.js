const discord = require("discord.js");
const config = require("../../config/config.json");
const users = require("../../config/users.json");
const ms = require("pretty-ms");
const {RichEmbed} = require("discord.js");

module.exports = {
  name: "admin",
  aliases: ["Admin", "adminhelp"],
  category: "admin",
  run: async (bot, message, args) => {
    if (!users[message.author.id]) {
      return message.reply("You Cannot Use This Command!")
    }
    if (users[message.author.id].isAdmin === "false") {
      return message.reply("You Can Not Use This Command!");
    }

    const embed = new discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(`${config.name} | Admin Help`)
      .setThumbnail((config.thumbnails[Math.floor(Math.random() * config.thumbnails.length)]))
      .addField("**__Commands:__**", "```ini\n.give [user] [expire (days/Life)] [Reseller (true/false)] [Admin (true/false)] [max players]\n.banuser [user] [reason]\n.unbanuser [user] [reason]\n.pricesheet```", true)
      .setTimestamp()

      .setAuthor(bot.user.tag, bot.user.displayAvatarURL);
    message.channel.send(embed);
  }
}