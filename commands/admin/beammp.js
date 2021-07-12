require('moment-duration-format');
const discord = require("discord.js");
const users = require('../../config/users.json');
const config = require("../../config/config.json");
const axios = require('axios');


module.exports = {
    name: "beammp",
    aliases: ["Beammp", "beammpinfo"],
    category: "admin",
    run: async (bot, message, args) => {
        message.delete()

        if (!users[message.author.id]) {
            return message.reply("You Cannot Use This Command!")
        }

        if (!users[message.author.id] || users[message.author.id].isAdmin === "false") {
            return message.reply("You Cannot Use This Command!")
        }

        if (args < 2) {
            return message.reply("You filled it out incorrectly.\nTry again like this:\n```ini\n.beammp [Owner's Discord] [enable/disable]```")
        }


        var update = 'true'
        update = args[0]
        var pps = ''
        var playercount = ''
        var players = ''
        var maxplayers = ''
        var map = ''
        var owner = ''
        var mods = ''
        var modlist = ''
        var modsize = ''
        var name = ''

        if (update === 'disable') {

        } else if (update === 'enable') {
            makeGetRequest()
            async function makeGetRequest() {
                const {
                    data
                } = await axios.get(`https://backend.beammp.com/servers-info`)

                data.forEach(function (server) {
                    if (server.owner == `${config.BeamMP.ownerdiscord}`) {
                        name = server.sname
                        playercount = server.players
                        players = server.playerslist
                        maxplayers = server.maxplayers
                        map = server.map
                        owner = server.owner
                        pps = server.pps
                        mods = server.modstotal
                        modlist = server.modlist
                        modsize = server.modstotalsize
                    }
                });
            }

            const embed = new discord.MessageEmbed().setColor("BLUE").setDescription("This Bot Monitors Our BeamMP Server, This Bot Auto Updates Every Minute.").setThumbnail((config.thumbnails[Math.floor(Math.random() * config.thumbnails.length)])).addField(`__Owner__: ${owner}\n__Map__: ${map}\n__PPS__: ${pps}\n__Mods__: ${mods}\n__Mod Size__: ${modsize}\n__Mod List__: ${modlist}\n__Total Players__: ${playercount}\n__Player__: ${players}`).setTimestamp().setFooter("BeamMP Server Stats", "");
            message.channel.send(embed).then((msg) => {
                setInterval(function () {
                    makeGetRequest()
                    const embed = new discord.MessageEmbed().setColor("BLUE").setDescription("This Bot Monitors Our BeamMP Server, This Bot Auto Updates Every Minute.").setThumbnail((config.thumbnails[Math.floor(Math.random() * config.thumbnails.length)])).addField(`__Owner__: ${owner}\n__Map__: ${map}\n__PPS__: ${pps}\n__Mods__: ${mods}\n__Mod Size__: ${modsize}\n__Mod List__: ${modlist}\n__Total Players__: ${playercount}\n__Player__: ${players}`).setTimestamp().setFooter("BeamMP Server Stats", "");
                    msg.edit(embed);
                    //setTimeout(makeGetRequest, 60000)
                }, 30000);
            });
        }
    }
}