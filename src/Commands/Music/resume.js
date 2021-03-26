const Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "resume",
      aliases: [],
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

      if (!client.player.getQueue(message).paused)
        return message.channel.send(`The music is already playing !`);

      const success = client.player.resume(message);

      if (success)
        message.channel.send(
          `Song ${client.player.getQueue(message).playing.title} resumed !`
        );
    } catch (error) {
      message.channel.send(error.message);
    }
  }
};
