const Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "nowplaying",
      aliases: ["np"],
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

      const track = client.player.nowPlaying(message);

      message.channel.send({
        embed: {
          color: "RED",
          author: { name: track.title },
          fields: [
            { name: "Channel", value: track.author, inline: true },
            {
              name: "Requested by",
              value: track.requestedBy.username,
              inline: true,
            },
            {
              name: "From playlist",
              value: track.fromPlaylist ? "Yes" : "No",
              inline: true,
            },

            { name: "Views", value: track.views, inline: true },
            { name: "Duration", value: track.duration, inline: true },
            {
              name: "Volume",
              value: client.player.getQueue(message).volume,
              inline: true,
            },
            {
              name: "Repeat mode",
              value: client.player.getQueue(message).repeatMode ? "Yes" : "No",
              inline: true,
            },
            {
              name: "Currently paused",
              value: client.player.getQueue(message).paused ? "Yes" : "No",
              inline: true,
            },

            {
              name: "Progress bar",
              value: client.player.createProgressBar(message, {
                timecodes: true,
              }),
              inline: true,
            },
          ],
          thumbnail: { url: track.thumbnail },
          timestamp: new Date(),
        },
      });
    } catch (error) {
      message.channel.send(error.message);
    }
  }
};
