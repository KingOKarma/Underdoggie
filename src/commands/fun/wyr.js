const Discord = require("discord.js")
const Wyr = require("../../models/wyrlist");

module.exports = {
    name: 'wyr', //You can name the cmd here
    run: async (_, message, args) => {

        message.delete({ timeout: 500 })


        Wyr.find({
            Identifier: "wyr"

        },
            (err, wyr) => {
                if (err) console.log(err);
                const theWYR = wyr[Math.floor(Math.random() * wyr.length)];


                if (!theWYR) {
                    message.reply("No currect would you rather's have been setup please ask a staff member to set one with `u!addwys`")
                } else if (theWYR.Embed == true) {

                    const embed = new Discord.MessageEmbed()
                    embed.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                    embed.setDescription(theWYR.Question)
                    embed.setColor(message.guild.me.displayColor)
                    embed.setFooter(`Creator - ${theWYR.UserName} | ID - ${theWYR.UserID}`)
                    message.channel.send(embed)
                        .then((theMsg) => {
                            var emoteID = message.client.emojis.resolveID(theWYR.Reaction1.slice(0, -1))
                            var emoteID2 = message.client.emojis.resolveID(theWYR.Reaction2.slice(0, -1))

                            theMsg.react(emoteID)
                            theMsg.react(emoteID2)
                        }).catch((err) => {
                            message.reply("there was an error:\n " + err)
                        })

                } else {
                    message.channel.send(`${theWYR.Question} \n ||Creator - ${theWYR.UserName} | ID - ${theWYR.UserID}||`)
                        .then((theMsg) => {
                            var emoteID = message.client.emojis.resolveID(theWYR.Reaction1.slice(0, -1))
                            var emoteID2 = message.client.emojis.resolveID(theWYR.Reaction2.slice(0, -1))

                            theMsg.react(emoteID)
                            theMsg.react(emoteID2)
                        }).catch((err) => {
                            message.reply("there was an error:\n " + err)
                        })

                }




            })



    }

}
