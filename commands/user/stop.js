require('moment-duration-format');
const moment = require('moment-timezone');
const discord = require("discord.js");
const data = require("../../config/data.json");
const users = require("../../config/users.json");
const config = require("../../config/config.json");
const fs = require('fs');
const {
    exec
} = require("child_process");

module.exports = {
    name: "stop",
    aliases: ["shutdown", "Stop"],
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

        if (users[message.author.id].Server.isActive === false) {
            return message.reply("Your Server Is Offline, Please Start It")
        }


        function update(file, json) {
            fs.writeFile(file, JSON.stringify(json, null, 2), "utf8", function (err) {});
        }

        //Quit Screen
        exec(`screen -XS ${message.author.id} quit`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`Server Stopped`);
            users[message.author.id].Server.isActive = false
            update("config/users.json", users);
        });

        const embed = new discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription(`${config.name} | Stop`)
            .setThumbnail("https://beammp.com/img/mainlogo.png")
            .addField("**__Server Shutdown:__**", "```ini\nOwner: " + message.author.id + "\nServer Name:" + users[message.author.id].Server.serverName + "```", true)
            .setFooter(`Droplet | BeamMP Server Manager Developed By Turlx`)
            .setTimestamp()
        message.channel.send(embed);

    }
}