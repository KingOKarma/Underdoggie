module.exports = {
    name: 'say',
    aliases: ["s"],

    run: (_, message, args) => {
        const config = new require('../../config.json')

        if (!message.member.roles.cache.has(config.BoosterID) && !message.member.roles.cache.has(config.StaffID)) return message.channel.send("Sorry but my commands are for Server boosters only!")


        message.delete({timeout: 25});
        message.channel.send(args.join(' '))

    }
}