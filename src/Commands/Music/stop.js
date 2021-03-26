const Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "stop",
      aliases: ["dc"],
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

      if (!client.player.getQueue(message))
        return message.channel.send(`No music currently playing !`);

      client.player.setRepeatMode(message, false);
      const success = client.player.stop(message);

      if (success) message.channel.send(`Music **stopped** into this server !`);
    } catch (error) {
      message.channel.send(error.message);
    }
  }
};
