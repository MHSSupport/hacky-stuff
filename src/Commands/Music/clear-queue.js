const Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "clear-queue",
      aliases: ["cq"],
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

      if (client.player.getQueue(message).tracks.length <= 1)
        return message.channel.send(`There is only one song in the queue.`);

      client.player.clearQueue(message);

      message.channel.send(`The queue has just been **removed** !`);
    } catch (error) {
      message.channel.send(error.message);
    }
  }
};
