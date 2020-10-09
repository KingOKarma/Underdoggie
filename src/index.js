const Discord = require('discord.js'); //gets hte discord.js library
const bot = new Discord.Client(); //creats a const for the discord client
const config = require('./config.json'); //allows this file to reach your config file
const mongoose = require("mongoose");



let token = config.token //creates a var for your token
const prefix = config.prefix //creates a var for the prefix





let MongoToggle = config.MongoURL
mongoose.connect(MongoToggle, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to DB")
    })
    .catch(err => {
        console.error("mongoose error" + err);
    })



bot.on('ready', async () => { //runs when event "ready" is on (so when the bot turns on)

    const setCollections = require('./utils/collections'); //grabs the collection
    setCollections(bot);
    const commandHandler = require('./handlers/command'); //grabs the handler
    commandHandler(bot);


    console.log('Im Online now bois');

    console.log(`Bot has started, with ${bot.users.cache.size} users, in ${bot.channels.cache.size} channels of ${bot.guilds.cache.size} guilds.`);

    bot.user.setActivity(`I'm your friendly neighbourhood booster bot!`); //sets status

});


bot.on('message', message => { //runs when event "message" is sent (so when the bot sees msgs)
    if (!message.channel.type == "dm") return; //checks if channel is a dm
    if (message.author.bot) return; //checks if author is a bot
    let StaffID = config.StaffID
    let BoosterID = config.BoosterID

    if (!message.content.toLowerCase().startsWith(prefix)) return; //makes sure the bot only responds to cmds with its prefix
    if (!message.member.roles.cache.has(BoosterID) && !message.member.roles.cache.has(StaffID)) return message.channel.send("Sorry but my commands are for Server boosters only!")

    const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/g); //creats the args var
    const commandname = args.shift().toLowerCase(); //cmd name

    const command = bot.commands.get(commandname) || bot.commands.get(bot.aliases.get(commandname));
    if (!command) return;
    try {
        command.run(bot, message, args, prefix); //runs the cmd from the folders provided
    } catch (error) {
        console.error(error);
    }

});

bot.on('message', message => { //runs when event "message" is sent (so when the bot sees msgs)

    if (message.content.toLowerCase() === "<@!673267146251567144>") {
        message.channel.send("My commands are only for Server boosters! \n **list of cmds** \n`-` u!comment - alias: u!cm \n`-` u!ping \n`-` u!kek")
        console.log("a")
    }
    if (message.content.toLowerCase() === `${config.prefix}help`) {
        message.channel.send("My commands are only for Server boosters! \n **list of cmds** \n`-` u!comment - alias: u!cm \n`-` u!ping \n`-` u!kek")
        console.log("aa")
    }


});


bot.on('message', message => {
    const EmoteServer = message.client.guilds.cache.get("738771970665218181")
    const EmoteChannel = EmoteServer.channels.cache.get("750836931281289217");
    const Upvote = EmoteServer.emojis.cache.get("761019251674710036");
    const Downvote = EmoteServer.emojis.cache.get("761019238114525194")
    //a



    if (message.channel.id != "750836931281289217") return;
    message.react(Upvote)
        .catch((err) => {
            console.log(err)
        })
    message.react(Downvote)

})

bot.login(token).catch(console.error) //logs in

