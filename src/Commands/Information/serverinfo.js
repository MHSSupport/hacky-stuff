const Command = require("../../Structures/Command"),
  { MessageEmbed } = require("discord.js"),
  moment = require("moment");

const filterLevels = {
    DISABLED: "Off",
    MEMBERS_WITHOUT_ROLES: "No Role",
    ALL_MEMBERS: "Everyone",
  },
  verificationLevels = {
    NONE: "None",
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "(╯°□°）╯︵ ┻━┻",
    VERY_HIGH: "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻",
  },
  regions = {
    "eu-central": "EU Central",
    london: "London",
    frankfurt: "Frankfurt",
    dubai: "Dubai",
    "south-korea": "South Korea",
    "eu-west": "EU West",
    amsterdam: "Amsterdam",
    brazil: "Brazil",
    europe: "Europe",
    hongkong: "Hong Kong",
    india: "India",
    japan: "Japan",
    russia: "Russia",
    singapore: "Singapore",
    southafrica: "South Africa",
    sydney: "Sydney",
    "us-central": "US Central",
    "us-east": "US East",
    "us-west": "US West",
    "us-south": "US South",
  };

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["server", "guild", "guildinfo", "si"],
      description:
        "Displays information about the server that said message was run in.",
      category: "Information",
    });
  }

  async run(message) {
    const roles = message.guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map((role) => role.toString()),
      members = message.guild.members.cache,
      channels = message.guild.channels.cache,
      emojis = message.guild.emojis.cache;

    const embed = new MessageEmbed()
      .setDescription(`**Guild information for __${message.guild.name}__**`)
      .setColor("BLUE")
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addField("General", [
        `**❯ Name:** ${message.guild.name}`,
        `**❯ ID:** ${message.guild.id}`,
        `**❯ Owner:** ${message.guild.owner.user.tag}`,
        `**❯ Owner ID:** ${message.guild.ownerID}`,
        `**❯ Region:** ${regions[message.guild.region]}`,
        `**❯ Boost Tier:** ${
          message.guild.premiumTier
            ? `Tier ${message.guild.premiumTier}`
            : "None"
        }`,
        `**❯ Explicit Filter:** ${
          filterLevels[message.guild.explicitContentFilter]
        }`,
        `**❯ Verification Level:** ${
          verificationLevels[message.guild.verificationLevel]
        }`,
        `**❯ Time Created:** ${moment(message.guild.createdTimestamp).format(
          "LT"
        )} ${moment(message.guild.createdTimestamp).format("LL")} ${moment(
          message.guild.createdTimestamp
        ).fromNow()}`,
        "\u200b",
      ])
      .addField("Statistics", [
        `**❯ Role Count:** ${roles.length}`,
        `**❯ Emoji Count:** ${emojis.size}`,
        `**❯ Regular Emoji Count:** ${emojis
          .filter((emoji) => !emoji.animated)
          .size.toLocaleString()}`,
        `**❯ Animated Emoji Count:** ${emojis
          .filter((emoji) => emoji.animated)
          .size.toLocaleString()}`,
        `**❯ Member Count:** ${message.guild.memberCount.toLocaleString()}`,
        `**❯ Humans:** ${members
          .filter((member) => !member.user.bot)
          .size.toLocaleString()}`,
        `**❯ Bots:** ${members
          .filter((member) => member.user.bot)
          .size.toLocaleString()}`,
        `**❯ Text Channels:** ${channels
          .filter((channel) => channel.type === "text")
          .size.toLocaleString()}`,
        `**❯ Voice Channels:** ${channels
          .filter((channel) => channel.type === "voice")
          .size.toLocaleString()}`,
        `**❯ Boost Count:** ${message.guild.premiumSubscriptionCount || "0"}`,
        "\u200b",
      ])
      .addField("Presence", [
        `**❯ Online:** ${members
          .filter((member) => member.presence.status === "online")
          .size.toLocaleString()}`,
        `**❯ Idle:** ${members
          .filter((member) => member.presence.status === "idle")
          .size.toLocaleString()}`,
        `**❯ Do Not Disturb:** ${members
          .filter((member) => member.presence.status === "dnd")
          .size.toLocaleString()}`,
        `**❯ Offline:** ${members
          .filter((member) => member.presence.status === "offline")
          .size.toLocaleString()}`,
        "\u200b",
      ])
      .setTimestamp();
    message.channel.send(embed);
  }
};
