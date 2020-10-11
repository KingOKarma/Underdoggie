const Discord = require("discord.js")
module.exports = {
    name: 'embed',
    aliases: ["eb"],
    run: (_, message, args) => {
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")

        message.delete({ timeout: 25 });
        if (args[0] === undefined) return

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.client.user.tag, message.client.user.displayAvatarURL())
            .setDescription(args.join(' '))
            .setColor(message.guild.me.displayColor)
        message.channel.send(embed)



    }
}