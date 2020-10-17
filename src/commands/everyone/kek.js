module.exports = {
    name: 'kek', //You can name the cmd here
    run: async (_, message, args) => {
        const config = new require('../../config.json')

        if (!message.member.roles.cache.has(config.BoosterID) && !message.member.roles.cache.has(config.StaffID)) return message.channel.send("Sorry but my commands are for Server boosters only!")
        message.channel.send(`KEK`) //this is your command
        console.log("someone was a gamer"); //this will log when the cmd is ran
    }

}
