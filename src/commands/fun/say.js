module.exports = {
    name: 'say',
    aliases: ["s"],

    run: (_, message, args) => {

        message.delete({timeout: 25});
        if (args[0] === undefined) return 
        message.channel.send(args.join(' '))

    }
}