const Command = require("../../Structures/Command"),
  { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "channelinfo",
      aliases: ["channel", "ci"],
      category: "Information",
    });
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    let channel = message.channel;
    if (args[0]) {
      if (!message.guild.channels.cache.has(args[0]))
        return message.channel.send(
          "Invalid channel ID provided (channel must be from this server)"
        );
      channel = message.guild.channels.cache.get(args[0]);
    }
    function checkDays(date) {
      let now = new Date(),
        diff = now.getTime() - date.getTime(),
        days = Math.floor(diff / 86400000);
      return days + (days == 1 ? " day" : " days") + " ago";
    }
    const e = new MessageEmbed()
      .setTitle(`channel info for ${channel.name}`)
      .addField(`Channel Name:`, [`${channel.name}`])
      .addField(`channel created:`, [
        `${channel.createdAt.toUTCString().substr(0, 16)} (${checkDays(
          channel.createdAt
        )})`,
      ])
      .addField(`channel ID`, [`${channel.id}`])
      .addField(`channel type:`, [`${channel.type}`])
      .addField(`channel topic:`, [`${channel.topic || "No topic set"}`])
      .setColor("RANDOM")
      .setFooter(`use a channel id to see info for that channel`);
    return message.channel.send(e);
  }
};
