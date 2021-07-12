require('moment-duration-format');
const moment = require('moment-timezone');
const discord = require("discord.js");
const data = require("../../config/data.json");
const users = require("../../config/users.json");
const config = require("../../config/config.json");
const fs = require('fs');

module.exports = {
    name: "change",
    aliases: ["Change", "settings", "changeconfig"],
    category: "user",
    run: async (bot, message, args) => {
        message.delete()
        if (!users[message.author.id]) {
            return message.reply("You Cannot Use This Command!")
        }
        if (users[message.author.id].isBanned == "true") {
            return message.reply("You Have Been Banned! Use .userinfo For The Specified Reason!")
        }

        function hasPackage(person) {
            if (users[person] == undefined) {} else {
                var expire = users[person].expire;

                if (expire > moment().unix()) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        if (!hasPackage(message.author.id)) {
            message.reply('You dont have a package or your package has expired.')
            return;
        }

        if (args.length < 2) return message.reply("**Usage:** .change [option] [value]")

        function update(file, json) {
            fs.writeFile(file, JSON.stringify(json, null, 2), "utf8", function (err) {});
        }
        person = message.author.id
        value = args.slice(1).join(' ')
        if (users[person].isAdmin === "false" && args[0] === "maxPlayers"){
            return message.reply("You Cannot Change This On Your Server, Contact The Owner To Do So!")
        }

        if (args[0] === "serverName") {
            users[person].Server.serverName = value;
        } else if (args[0] === "serverDesc") {
            users[person].Server.serverDesc = value;
        } else if (args[0] === "serverMap") {
            users[person].Server.serverMap = value;
        } else if (args[0] === "maxPlayers") {
            users[person].Server.maxPlayers = value;
        } else if (args[0] === "maxCars") {
            users[person].Server.maxCars = value;
        } else if (args[0] === "isPrivate") {
            users[person].Server.isPrivate = value;
        } else {
            return message.reply("Invalid Option, Please Use The Names That Are Used In .config")
        }
        update("config/users.json", users);

        const embed = new discord.MessageEmbed()
            .setColor("BLUE")
            .setThumbnail((config.thumbnails[Math.floor(Math.random() * config.thumbnails.length)]))
            .addField("Updated");
        message.channel.send(embed);
    }
}