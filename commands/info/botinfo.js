const discord = require("discord.js");
const config = require("../../config/config.json");
const users = require("../../config/users.json");
const data = require("../../config/data.json");
const fs = require('fs');
const moment = require('moment-timezone');
const cpuStat = require('cpu-stat');
const ms = require("pretty-ms");

module.exports = {
  name: "botinfo",
  aliases: ["Botinfo"],
  category: "info",
  run: async (bot, message, args) => {

    let memory = ((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2))
    let {
      version
    } = require("discord.js");
    let botuptime = moment.duration(bot.uptime).format(" H [hrs], m [mins]");

    cpuStat.usagePercent(function (err, percent, seconds) {
      if (err) {
        return console.log(err);
      }

      const response = new discord.MessageEmbed()

        .setTitle("*** Bot Stats ***")
        .setColor("BLUE")
        .setThumbnail((config.thumbnails[Math.floor(Math.random() * config.thumbnails.length)]))
        .addField("CPU usage", `\`${percent.toFixed(2)}%\``, true)
        .addField("Mem Usage", `${memory}%`, true)
        .addField("Users", `${bot.users.size}`, true)
        .addField("Uptime ", `${botuptime}`, true)
        //.addField("VPN Servers:", `${config.blacklist.hosts.length}`,true)
        .addField("Paid Users:", `${Object.keys(users).length}`, true)

      message.channel.send(response)
    })

    return;
  }
}