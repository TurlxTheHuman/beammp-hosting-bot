require('moment-duration-format');
const moment = require('moment-timezone');
const discord = require("discord.js");
const data = require("../../config/data.json");
const users = require("../../config/users.json");
const config = require("../../config/config.json");

module.exports = {
    name: "config",
    aliases: ["Config"],
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
        var servernumber = args[0];

        for (const servers of users[message.author.id].Server) {
            if (servers.serverNumber === servernumber) {
                console.log(servers)
            }
            else
            {

            }
        }
        var servername = ''
        var serverip = ''
        var serverport = ''
        var servername = ''
        var serverdescription = ''
        var servermap = ''
        var serverisactive = ''
        var serverisprivate = ''
        var servermaxcars = ''
        var servermaxplayers = ''
        var serverauthkey = ''

        //users[message.author.id].Server.forEach(function (server) {
            server = users[message.author.id].Server
            servername += `${server.serverName}\n`;
            serverip += `${server.serverIP}\n`
            serverport += `${server.serverPort}\n`
            serverdescription += `${server.serverDesc}\n`
            servermap += `${server.serverMap}\n`
            serverisactive += `${server.isActive}\n`
            serverisprivate += `${server.isPrivate}\n`
            servermaxcars += `${server.maxCars}\n`
            servermaxplayers += `${server.maxPlayers}\n`
            serverauthkey += `${server.serverAuth}\n`
            bluredauthkey = serverauthkey.slice(0, -13); 
            bluredauthkey = bluredauthkey+"#############"

        //});

        responsegive = new discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle(`${message.author.username}'s Server Config`)
            .setThumbnail(config.thumbnails[Math.floor(Math.random() * config.thumbnails.length)])
            .addField("**__Config__**", `serverName: ${servername}serverDesc: ${serverdescription}serverMap: ${servermap}maxPlayers: ${servermaxplayers}maxCars: ${servermaxcars}isPrivate: ${serverisprivate}serverAuth:\n${bluredauthkey}`, true)
            .setTimestamp()
        message.channel.send(responsegive);



    }
}