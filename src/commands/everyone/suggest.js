const Discord = require("discord.js");
const config = require('../../config.json'); //allows this file to reach your config file

module.exports = {
    name: 'suggest', //You can name the cmd here
    run: async (_, message, args) => {
        if (message.channel.type == "dm") return; //checks if channel is a dm

        message.delete({ timeout: 500 })




        const filter = response2 => {
            return response2.author.id === message.author.id;
        }


        message.author.send("Please type out your suggestion. If you wish to cancel please type `cancel`").then((msg) => {
            msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                .then(collected => {
                    if (collected.first().content.toLowerCase() === "cancel") return message.author.send("Cancelled suggestion")
                    message.author.send("Alright, nice suggestion! \n Two more questions!\n\n Would you like the suggestion to be anonymous? \n Please respond with either `yes` or `no`")
                    console.log(collected.first().content)

                    msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                        .then(collected2 => {
                            // if (collected2.first().content.toLowerCase() === "no") return message.author.send("Alright then, all canceled!")



                            switch (collected2.first().content.toLowerCase()) {

                                case "yes":

                                    let = anon = "yes"


                                    break;

                                case "no":

                                    let = anon = "no"

                                    break;


                                default:
                                    var anon = "undefined"

                                    message.author.send("I didnt find a `yes` or `no` so i have  canceled the suggestion anyway!")
                                    break;


                            }
                            console.log(message.author.tag + " said " + anon)
                            if (anon === "undefined") return

                            message.author.send("Nice!\nFinal question, are you 100% sure you want to send **THIS** Suggestion?\n\n" + collected.first().content + "\n\n Please respond with either `yes` or `no`")

                            msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                                .then(collected3 => {


                                    switch (collected3.first().content.toLowerCase()) {

                                        case "yes":

                                            let = isok = "yes"


                                            break;

                                        case "no":

                                            let = isok = "no"
                                            message.author.send("Alright then!\n have a nice day bye bye :D")


                                            break;


                                        default:
                                            var isok = "undefined"

                                            message.author.send("I didnt find a `yes` or `no` so i have  canceled the suggestion anyway!")
                                            break;


                                    }

                                    if (isok === "undefined") return console.log("they said nothing")
                                    if (isok === "no") return console.log("they said no")


                                    message.author.send(`Your suggestion has been sent into <#${config.FeedbackID}>`)
                                    console.log(collected3.first().content)

                                    const embed = new Discord.MessageEmbed()
                                        .setTitle('We got some feedback!')

                                    if (anon === "no") {
                                        embed.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                                    } else {
                                        embed.setAuthor("Anonymous#0000", "https://cdn.discordapp.com/attachments/643347490925445132/758369629155360818/2Q.png")
                                    }
                                    embed.setThumbnail(message.guild.iconURL({ dynamic: true }))
                                    embed.setDescription(`**Feedback:**\n${collected.first().content}`)
                                    embed.setColor(message.guild.me.displayColor)
                                    embed.setFooter("If you would like to sugggest please use u!suggest in #commands")

                                    const FeedbackCH = message.guild.channels.cache.get(config.FeedbackID)
                                    console.log(FeedbackCH.name)

                                    FeedbackCH.send(embed).then((embedID) => {

                                        if (anon === "yes") {
                                            const LogsCH = message.guild.channels.cache.get(config.LogsID)

                                            const embed2 = new Discord.MessageEmbed()

                                            embed2.setTitle("Anon suggest")
                                            embed2.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                                            embed2.setDescription(`\`${message.author.tag}\` sent an anonymous suggestion at: \n http://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${embedID.id}`)
                                            embed2.setColor(message.guild.me.displayColor)
                                            embed2.setFooter("You can suggest with u!suggest")
                                            LogsCH.send(embed2)

                                            //var ref = "http://discordapp.com/channels/" + message.guild.id + "/" + message.channel.id + "/" + message.id;


                                        }
                                    })





                                }).catch((err) => {
                                    message.author.send("There was a problem so i cancelled, reason:\n" + err)
                                })
                        }).catch((err) => {
                            message.author.send("There was a problem so i cancelled, reason:\n" + err)
                        })
                }).catch((err) => {
                    message.author.send("Your suggestion failed, reason:\n" + err)
                })


        }).catch((err) => {
            message.reply("I can't send dms to you. reason: \n" + err)
        });


    }

}
