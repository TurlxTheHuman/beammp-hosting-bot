const discord = require("discord.js");
const fs = require("fs");
const config = require("./config/config.json");
const bot = new discord.Client({disableEveryone: true});
const {Collection} = require("discord.js");

bot.commands = new Collection();
bot.aliases = new Collection();
bot.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is now online!`);

    bot.user.setPresence({
        status: "online",  // You can show online, idle... Do not disturb is dnd
        game: {
            name: ".help",  // The message shown
            type: "PLAYING" // PLAYING, WATCHING, LISTENING, STREAMING,
        }
    });
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    if (!command.startsWith(prefix)) return;
    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(bot, message, args);
});

bot.login(config.token);