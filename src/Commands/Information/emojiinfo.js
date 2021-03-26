const moment = require("moment"),
  vortexMusicEmbed = require("../../Structures/vortexMusicEmbed"),
  Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "emojiinfo",
      aliases: ["ei"],
      category: "Information",
      guildOnly: true,
    });
  }

  async run(message, [emote]) {
    if (!message.guild.me.hasPermission("MANAGE_EMOJIS"))
      return message.channel.send(
        new vortexMusicEmbed()
          .setTitle(`Command error`)
          .setDescription(`It seems i dont have the manage_emoji permission`)
          .setColor("RANDOM")
      );

    if (!emote)
      return message.channel.send(
        "You must provide an argument for this command!"
      );
    let match = emote.match(/^<a?:(\w+):(\d+)>$/);
    if (!match)
      return message.channel.send(
        "You must provide a valid Discord custom emoji!"
      );
    const emoteName = match[1],
      emoteID = match[2];

    const emoji = this.client.emojis.cache.find(
      (emj) => emj.name === emoteName && emj.id === emoteID
    );
    if (!emoji)
      return message.channel.send(
        new vortexMusicEmbed()
          .setTitle(`Command error`)
          .setDescription(
            `please include a valid emoji (must not be a default emoji)`
          )
          .setColor("RANDOM")
      );

    const authorFetch = await emoji.fetchAuthor();
    const checkOrCross = (bool) => (bool ? "✅" : "❎");

    const e = new vortexMusicEmbed()
      .setDescription(
        `**Emoji information for __${emoji.name.toLowerCase()}__**`
      )
      .setColor(message.guild.me.displayHexColor || "RANDOM")
      .setThumbnail(emoji.url)
      .addField(`General`, [
        `ID: ${emoji.id}`,
        `URL: [link to emoji](${emoji.url})`,
        `Author Tag: ${authorFetch.tag}`,
        `Author ID: ${authorFetch.id}`,
        `Time created: ${moment(emoji.createdTimestamp).format("LT")} ${moment(
          emoji.createdTimestamp
        ).format("LL")} ${moment(emoji.createdTimestamp).fromNow()}`,
      ])
      .addField(`Other`, [
        `Requires Colons: ${checkOrCross(emoji.requiresColons)}`,
        `Deleteable: ${checkOrCross(emoji.deleteable)}`,
        `Animaited: ${checkOrCross(emoji.animaited)}`,
        `Managed: ${checkOrCross(emoji.managed)}`,
      ])
      .setTimestamp();

    return message.channel.send(e);
  }
};
