const discord = require("discord.js");
const config = require("../../config/config.json");
const users = require("../../config/users.json");
const data = require("../../config/data.json");
const fs = require('fs');
const moment = require('moment-timezone');
const ms = require("pretty-ms");

module.exports = {
  name: "give",
  aliases: ["Give"],
  category: "admin",
  run: async (bot, message, args) => {
    var mention = message.mentions.members.first();

    if (!users[message.author.id]) {
      return message.reply("You Cannot Use This Command!")
    }

    if (users[message.author.id].isReseller === "false") {
      return message.reply("You Are Not A Reseller!");
    }

    if (users[message.author.id].isBanned == "true") {
      return message.reply("You Have Been Banned! Use .userinfo For The Specified Reason!")
    }

    if (!mention) {
      return message.reply("Usage: .give [user] [expire (days/life)]\nRemember, As A Reseller You Cannot Sell Reseller!");
    }


    const input = args.join(" "),
      userDetails = input.split(" "),
      person = userDetails[0].replace(/[\\<>@#&!]/g, "");
    length = userDetails[1]
    if (length == "Life") {
      length = "9999"
    }
    isReseller = "false"
    if (users[message.author.id].isAdmin === "true") {
      isReseller = userDetails[2]
    } else {
      isReseller = "false"
    }
    isAdmin = "false"
    if (users[message.author.id].isAdmin === "true") {
      isAdmin = userDetails[3]
    } else {
      isAdmin = "false"
    }
    maxPlayers = userDetails[4]
    expire = Number(moment().add(length, "day"));


    //AMOUNT OWED
    owed = users[message.author.id].amountOwed
    if (users[message.author.id].isAdmin === "false" && length === "30") {
      users[message.author.id].amountOwed = owed + 1
    } else if (users[message.author.id].isAdmin === "false" && length === "90") {
      users[message.author.id].amountOwed = owed + 2
    } else if (users[message.author.id].isAdmin === "false" && length === "Life") {
      users[message.author.id].amountOwed = owed + 9
    } else if (users[message.author.id].isAdmin === "false" && length === "9999") {
      users[message.author.id].amountOwed = owed + 9
    } else if ((users[message.author.id].isAdmin === "false" && length != "30") || (users[message.author.id].isAdmin === "false" && length != "90") || (users[message.author.id].isAdmin === "false" && length != "life") || (users[message.author.id].isAdmin === "false" && length != "9999")) {
      return message.reply("Invalid Days, Please Use: 30 Days, 90 Days, or life!")
    }

    if (users[message.author.id].isAdmin == "false" && users[person].isAdmin === "true") {
      return message.reply("You Can Not Edit An Admin Account!");
    }
    if (users[message.author.id].isAdmin == "false" && users[person.isReseller === "true"]) {
      return message.reply("You cannot edit a reseller's account!");
    }
    //
    if (userDetails.length < 2) {
      const incorrectUser = new discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle("You entered the incorrectly")
        .setDescription("```ini\n.give [user] [expire (days)]\nRemember, As A Reseller You Cannot Sell Reseller!```")
      return message.channel.send(incorrectUser)
    }

    function update(file, json) {
      fs.writeFile(file, JSON.stringify(json, null, 2), "utf8", function (err) {});
    }

    function makeUser(person) {
      users[person] = {};
      users[person].isAdmin = "false"
      users[person].isReseller = "false"
      users[person].isBanned = "false"
      users[person].banReason = ""
      users[person].bannedBy = ""
      users[person].Server = {};
      users[person].Server.serverNumber = "1"
      users[person].Server.serverIP = "192.168.1.137"
      users[person].Server.serverExpire = ""
      users[person].Server.isActive = "false"
      users[person].Server.isDebug = "false"
      users[person].Server.isPrivate = "false"
      users[person].Server.serverPort = ""
      users[person].Server.maxCars = "1"
      users[person].Server.maxPlayers = ""
      users[person].Server.serverMap = "/levels/west_coast_usa/info.json"
      users[person].Server.serverName = "Shared Droplet Server"
      users[person].Server.serverDesc = "Droplet Hosting | https://discord.gg/tZy8UZeDxA"
      users[person].Server.serverAuth = ""
      users[person].expire = ""
      users[person].plan = ""
      update("config/users.json", users);
    }

    if (!users[person]) {
      makeUser(person);
    }

    users[person].expire = moment(expire).unix();
    users[person].isReseller = isReseller;
    users[person].isAdmin = isAdmin;
    users[person].Server.maxPlayers = maxPlayers;
    users[person].Server.serverExpire = expire;
    update("config/users.json", users);

    //Logging
    logembed = new discord.MessageEmbed()
      .setColor("BLACK")
      .setThumbnail((config.thumbnails[Math.floor(Math.random() * config.thumbnails.length)]))
      .setDescription(`**${message.author.username}** Has Just Added <@${person}>\n In The ${config.name} Database.`)
      .addField("Client:", mention.user.username, true)
      .addField("Days:", length, true)
      .addField("Client ID:", "```yaml\n" + mention.user.id + "```")
      .addField("Admin ID:", "```http\n" + message.author.id + "```")
      .addField("Amount Owed:", "```http\n$" + users[message.author.id].amountOwed + "```")
      .setTimestamp()
    bot.channels.cache.get(config.channels.logs).send(logembed).catch(console.error)


    //
    responsegive = new discord.MessageEmbed()
      .setColor("BLACK")
      .setTitle(`Database Editor -> ${config.name}`)
      .setThumbnail((config.thumbnails[Math.floor(Math.random() * config.thumbnails.length)]))
      .setDescription(`You have modified the <@${person}>\n in the ${config.name} database.`)
      .addField("Client:", mention.user.username, true)
      .addField("Days:", length, true)
      .addField("Admin:", message.author.username, true)
      .addField("Client ID:", "```yaml\n" + mention.user.id + "```")
      .addField("Admin ID:", "```http\n" + message.author.id + "```")
      .setTimestamp()
    message.channel.send(responsegive);


  }
}