const Discord = require("discord.js");
const mongoose = require("mongoose")
const Wyr = require("../../models/wyrlist");

module.exports = {
    name: 'addwyr', //You can name the cmd here
    run: async (_, message, args) => {
        if (!message.member.permissionsIn(message.channel).has("MANAGE_MESSAGES")) return message.channel.send("You need the permission __**\"Manage Messages\"**__ to use this command")


        const filter = response2 => {
            return response2.author.id === message.author.id;
        }




        message.channel.send("Type out your \"Would you rather\" Question! \nType `cancel` to cancel").then(() => {
            message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                .then(collected => {
                    if (collected.first().content.toLowerCase() === "cancel") return message.reply("Cancelled process")
                    message.channel.send(`> Your Question is: **${collected.first().content}** \n Now please type out the first reaction for your first case! \n use \`cancel\` to cancel`)
                    message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                        .then(collected2 => {

                            //emote1

                            if (emoteCheck(collected2.first().content, message) === undefined) {
                                return
                            }

                            // if (emoteID === undefined) return


                            if (collected2.first().content.toLowerCase() === "cancel") return message.reply("Cancelled process")

                            message.channel.send(`> Your Question is: **${collected.first().content}** \n> Reaction 1: **${collected2.first().content}** \n> Now please type out the first reaction for your second case! \n use \`cancel\` to cancel`)
                            message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                                .then(collected3 => {

                                    //emote 2
                                    if (emoteCheck(collected3.first().content, message) === undefined) {
                                        return
                                    }



                                    if (collected3.first().content.toLowerCase() === "cancel") return message.reply("Cancelled process")

                                    message.channel.send(`> Your Question is: **${collected.first().content}** \n> Reaction 1: **${collected2.first().content}** \n> Reaction 2: **${collected3.first().content}** \nFor the Final question please respond with \`yes\` or \`no\`: Would you like the question to be an embed?!\n*note you can still use \`cancel\` to cancel!*`)


                                    message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                                        .then((collected4) => {
                                            switch (collected4.first().content.toLowerCase()) {

                                                case "cancel":
                                                    message.reply("Cancelled process")
                                                    break;


                                                case "yes":
                                                    const newWyr = new Wyr({
                                                        _id: mongoose.Types.ObjectId(),
                                                        Question: collected.first().content,
                                                        UserID: message.author.id,
                                                        UserName: message.author.tag,
                                                        Reaction1: collected2.first().content,
                                                        Reaction2: collected3.first().content,
                                                        Embed: true,
                                                        Identifier: "wyr"
                                                    })
                                                    newWyr.save().catch(err => console.log(err));
                                                    message.reply("Your Embed has been saved, and can now be found by using \`u!wyr\`")
                                                    break;


                                                case "no":
                                                    const newWyrnoEB = new Wyr({
                                                        _id: mongoose.Types.ObjectId(),
                                                        Question: collected.first().content,
                                                        UserID: message.author.id,
                                                        UserName: message.author.tag,
                                                        Reaction1: collected2.first().content,
                                                        Reaction2: collected3.first().content,
                                                        Embed: false,
                                                        Identifier: "wyr"

                                                    })
                                                    newWyrnoEB.save().catch(err => console.log(err));

                                                    message.reply("Everything has been saved and setup, the wyr will now appear when using \`u!wyr\`")
                                                    break;

                                                default:
                                                    message.reply("I didnt find a `yes` or `no` so i have  canceled the process!")
                                                    break;

                                            }

                                        }).catch((err) => {
                                            message.reply("You never said `yes` or `no` so i canceled the proccess!");
                                        });
                                }).catch((err) => {
                                    message.reply("You never gave me the second emote so i Timed out!\n so i canceled!");
                                });
                        }).catch((err) => {
                            message.reply("You never gave me the first emote so i Timed out!\n so i canceled!");
                        });
                })
                .catch((err) => {
                    message.reply("You never gave me the question so i Timed out!\n so i canceled!");
                });
        }).catch((err) => {
            message.channel.send(err);
        });



    }

}


function emoteCheck(Collection, message) {


    if (Collection === undefined) {
        console.log("thats nothing dummy")
        message.channel.send("That's not an emote from a server im in! \nCancelled process ")
        return
    } else if (!Collection.match(/\:(.*?)\>/)) {
        console.log("that aint no id")
        message.channel.send("That's not an emote from a server im in!\nCancelled process ")
        return
    } else {


        var first = Collection.slice(3).match(/\:.*?\>/)
        var theMatch = first[0].slice(1, -1)
        console.log(theMatch)

        if (Collection.match(/<a/)) {
            console.log("animated!")
            var emote = message.client.emojis.cache.find(emoji => emoji.id === `${theMatch}`)
            var emoteID = message.client.emojis.resolveID(emote)
            var ending = ".gif"
            if (emote === undefined) {
                message.channel.send("That's not an emote from a server im in!\nCancelled process ")
                return undefined
            }
            return emoteID
        } else {
            console.log("not animated!")
            var emote = message.client.emojis.cache.find(emoji => emoji.id === `${theMatch}`)
            var emoteID = message.client.emojis.resolveID(emote)
            var ending = ".png"
            if (emote === undefined) {
                message.channel.send("That's not an emote from a server im in!\nCancelled process ")
                return undefined
            }
            return emoteID
        }
    }





}