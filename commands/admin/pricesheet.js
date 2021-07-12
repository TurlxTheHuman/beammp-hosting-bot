const discord = require("discord.js");
const config = require("../../config/config.json");
const users = require("../../config/users.json");
const ms = require("pretty-ms");
const { RichEmbed } = require("discord.js");

module.exports = {
  name: "pricesheet",
  aliases: ["Pricesheet", "prices"],
  category: "admin",
  run: async (bot, message, args) => {
    if (!users[message.author.id]) {
      return message.reply("You Cannot Use This Command!")
    }
    if (users[message.author.id].isAdmin === "false") {
      return message.reply("You Can Not Use This Command!");
    }
    message.delete()
    const embed = new discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('Buy Menu')
      .setThumbnail((config.thumbnails[Math.floor(Math.random() * config.thumbnails.length)]))
      .setDescription("**__Read First__**\n Any Violation Against Our Terms Of Service Will Result In A Removal Of Your Plan, You May Be Lucky To Be Given A Warning, But Use Common Sense When Using This Bot, We'll Have No Sympathy Towards Anyone Who Beaks Our TOS!", true)
      .addField("```Plans:```", "```yaml\n Monthly: $5\n Tri-Monthly: $10\n Lifetime: $45\n \n Reseller Monthly: $15\n Reseller Lifetime: $80\n 20/80 Profit Split, You Get 80% Of What You Make. As A Reseller You CANNOT Sell Reseller.```", true)
      .addField("```Payment```", "**__Bitcoin, Cashapp, Paypal, Venmo__** Contact Turlx or Ravenz To Purchase")
      .setAuthor(bot.user.tag, bot.user.displayAvatarURL);
    message.reply(embed)
  }
}