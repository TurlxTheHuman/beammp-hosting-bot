

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
    name: "makeserver",
    aliases: ["Makeserver"],
    category: "admin",
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

        if (users[message.author.id].isAdmin === "false") {
            return message.reply("Only Admins Are Able To use This Command!")
        }


        function update(file, json) {
            fs.writeFile(file, JSON.stringify(json, null, 2), "utf8", function (err) {});
        }

        var mention = message.mentions.members.first();
        exec(`cd /root/beammp/; cp Server-Files -r ${mention.user.id}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                message.reply(`>Error Has Occur ed Creating The Server`)
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`Server Made`);
            //update("config/users.json", users);
        });

        const embed = new discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription(`${config.name} | Restart`)
            .setThumbnail("https://beammp.com/img/mainlogo.png")
            .addField("**__Server Created:__**", "```ini\n BeamMP Server Was Made And Installed In The Shared Server!```", true)
            .setFooter(`Droplet | BeamMP Server Manager Developed By Turlx`)
            .setTimestamp()
        message.channel.send(embed);

    }
}