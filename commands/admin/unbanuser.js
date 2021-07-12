const discord = require("discord.js");
const config = require("../../config/config.json");
const users = require("../../config/users.json");
const data = require("../../config/data.json");
const fs = require('fs');
const moment = require('moment-timezone');
const ms = require("pretty-ms");

module.exports = {
  name: "unbanuser",
  aliases: ["Unbanuser", "databaseunban"],
  category: "admin",
  run: async (bot, message, args) => {
    var mention = message.mentions.members.first();

    if (!users[message.author.id]) {
      return message.reply("You Cannot Use This Command!")
    }

    if (users[message.author.id].isAdmin === "false" || users[message.author.id].isBanned === "true") {
      return message.reply("You Cannot Use This Command!");
    }


    if (!mention) {
      return message.reply("Usage: .unbanuser [user] [reason]");
    }
    person = mention.user.id
    const Reason = args.slice(1).join(' ')

    //
    if (args.length < 2) {
      const incorrectUser = new discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle("You entered the incorrectly")
        .setDescription("```ini\n.unbanuser [user] [reason]```")
      return message.channel.send(incorrectUser)
    }

    function update(file, json) {
      fs.writeFile(file, JSON.stringify(json, null, 2), "utf8", function (err) {});
    }

    users[person].isBanned = "false";
    users[person].banReason = "";
    users[person].bannedBy = ""
    update("config/users.json", users);

    //Logging
    logembed = new discord.MessageEmbed()
      .setColor("BLUE")
      .setTitle(`Database Editor -> ${config.name}`)
      .setThumbnail(mention.user.avatarURL)
      .setDescription(`<@${person}>\n Has Been **UNBANNED** From The ${config.name} Database.`)
      .addField("Client:", mention.user.username, true)
      .addField("Reason For Unban:", Reason, true)
      .addField("Admin:", message.author.username, true)
      .addField("Client ID:", "```yaml\n" + mention.user.id + "```")
      .addField("Admin ID:", "```http\n" + message.author.id + "```")
      .setTimestamp()
    bot.channels.cache.get(config.channels.logs).send(logembed)


    //
    responsegive = new discord.MessageEmbed()
      .setColor("BLUE")
      .setTitle(`Database Editor -> ${config.name}`)
      .setThumbnail(mention.user.avatarURL)
      .setDescription(`<@${person}>\n Has Been **UNBANNED** From The ${config.name} Database.`)
      .addField("Client:", mention.user.username, true)
      .addField("Reason For Unban:", Reason, true)
      .addField("Admin:", message.author.username, true)
      .addField("Client ID:", "```yaml\n" + mention.user.id + "```")
      .addField("Admin ID:", "```http\n" + message.author.id + "```")
      .setTimestamp()
    message.channel.send(responsegive);


  }
}