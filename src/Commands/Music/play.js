const Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "play",
      aliases: ["p"],
      category: "Music",
    });
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    try {
      const client = this.client;

      if (!message.member.voice.channel)
        return message.channel.send(`You're not in a voice channel !`);

      if (
        message.guild.me.voice.channel &&
        message.member.voice.channel.id !== message.guild.me.voice.channel.id
      )
        return message.channel.send(`You are not in the same voice channel !`);

      if (!args[0])
        return message.channel.send(`Please indicate the title of a song !`);

      client.player.play(message, args.join(" "), { firstResult: true });
      
    } catch (error) {
      message.channel.send(error.message);
    }
  }
};
