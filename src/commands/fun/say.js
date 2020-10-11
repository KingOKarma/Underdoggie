module.exports = {
    name: 'say',
    aliases: ["s"],

    run: (_, message, args) => {

        message.delete({timeout: 25});
        message.channel.send(args.join(' '))

    }
}