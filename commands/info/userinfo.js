const discord = require("discord.js");
const config = require("../../config/config.json");
const users = require("../../config/users.json");
const data = require("../../config/data.json");
const moment = require('moment-timezone');
const fs = require('fs');

module.exports = {
  name: "userinfo",
  aliases: ["Userinfo"],
  category: "info",
  run: async (bot, message, args) => {
    message.delete()

    const input = args.join(" ");
    const userDetails = input.split(" ");
    const mention = message.mentions.members.first();
    const person = userDetails[0].replace(/[\\<>@#&!]/g, "");


    function expireDate(person) {
      var expire = moment.unix(users[person].expire);
      if (expire < moment().unix()) return "Expired";
      return expire.format('MMMM Do YYYY, h:mm:ss a');
    }
    if (args < 1) {

      if (!users[message.author.id]) {
        return message.reply("You Have No Info In Our Database!")
      }
      const response = new discord.MessageEmbed()
        .setColor('#000')
        .setThumbnail((config.thumbnails[Math.floor(Math.random() * config.thumbnails.length)]))
        .setAuthor(`User Information`)
        .addField('**Username:**', "```css\n" + message.author.username + "```", true)
        .addField('**Reseller:**', "```http\n" + users[message.author.id].isReseller + "```", true)
        .addField('**Is Admin:**', "```http\n" + users[message.author.id].isAdmin + "```", true)
        .addField('**Expire:**', "```http\n" + expireDate(message.author.id) + "```")
        .addField('**Is Banned:**', "```http\n" + users[message.author.id].isBanned + "```")
        .addField('**Ban Reason:**', "```\n" + users[message.author.id].banReason + "```")
        .addField('**ID:**', "```diff\n-" + message.author.id + "```")
        .setTimestamp()
        .setFooter(`${message.author.username} - ${config.name}.`);
      return message.channel.send(response)
    }

    if (!users[mention.user.id]) {
      return message.reply("The Person You Mentioned Has No Data In Our Database!")
    }

    const response = new discord.MessageEmbed()

      .setColor("BLACK")
      .setAuthor(mention.user.username + " <-- User Information", mention.user.avatarURL)
      .setThumbnail((config.thumbnails[Math.floor(Math.random() * config.thumbnails.length)]))
      .addField('**Username:**', mention.user.username, true)
      .addField('**Reseller:**', users[person].isReseller, true)
      .addField('**Is Admin:**', "```http\n" + users[person].isAdmin + "```", true)
      .addField('**Expire:**', "```http\n" + expireDate(person) + "```")
      .addField('**Is Banned:**', "```http\n" + users[person].isBanned + "```")
      .addField('**Ban Reason:**', "```" + users[person].banReason + "```")
      .addField('**ID:**', "```diff\n-" + person + "```")

    return message.channel.send(response);




  }
}