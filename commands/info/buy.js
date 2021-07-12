const discord = require("discord.js");
const config = require("../../config/config.json");
const ms = require("pretty-ms");
const { RichEmbed } = require("discord.js");

module.exports = {
  name: "buy",
  aliases: ["Buy"],
  category: "info",
  run: async (bot, message, args) => {
    message.delete()
    const embed = new discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('Buy Menu')
      .setThumbnail((config.thumbnails[Math.floor(Math.random() * config.thumbnails.length)]))
      .setDescription("**__Read First__**\n Any Violation Against Our Terms Of Service Will Result In A Removal Of Your Plan, You May Be Lucky To Be Given A Warning, But Use Common Sense When Using This Bot, We'll Have No Sympathy Towards Anyone Who Beaks Our TOS!", true)
      .addField("```Plans:```", "```yaml\n Monthly: $5\n Tri-Monthly: $10\n Lifetime: $45\n \n Reseller Monthly: $15\n Reseller Lifetime: $80\n 20/80 Profit Split, You Get 80% Of What You Make. As A Reseller You CANNOT Sell Reseller.```", true)
      .addField("```Payment```", "**__Bitcoin, Cashapp, Paypal, Venmo__** Contact Turlx or Ravenz To Purchase")

      .setAuthor(bot.user.tag, bot.user.displayAvatarURL);
    message.author.send(embed)
    message.reply('List Of Prices Was Sent `To Your DM` Containing All Plans And Prices!')
  }
}