const Command = require("../../Structures/Command"),
  { MessageEmbed } = require("discord.js"),
  moment = require("moment");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["user", "ui"],
      description:
        "Displays information about a provided user or the message author.",
      category: "Information",
      usage: "[user]",
    });
  }

  async run(message, [target], args) {
    const flags = {
      DISCORD_EMPLOYEE: "Discord Employee",
      DISCORD_PARTNER: "Discord Partner",
      BUGHUNTER_LEVEL_1: "Bug Hunter (Level 1)",
      BUGHUNTER_LEVEL_2: "Bug Hunter (Level 2)",
      HYPESQUAD_EVENTS: "HypeSquad Events",
      HOUSE_BRAVERY: "House of Bravery",
      HOUSE_BRILLIANCE: "House of Brilliance",
      HOUSE_BALANCE: "House of Balance",
      EARLY_SUPPORTER: "Early Supporter",
      TEAM_USER: "Team User",
      SYSTEM: "System",
      VERIFIED_BOT: "Verified Bot",
      VERIFIED_DEVELOPER: "Verified Bot Developer",
    };

    const member =
        message.mentions.members.last() ||
        message.guild.members.cache.get(target) ||
        message.guild.members.cache.find(
          (r) =>
            r.user.username.toLowerCase() ===
            args?.join(" ").toLocaleLowerCase()
        ) ||
        message.member,
      roles = member.roles.cache
        .sort((a, b) => b.position - a.position)
        .map((role) => role.toString())
        .slice(0, -1);
    const userFlags = member.user.flags ? member.user.flags.toArray() : [];

    const embed = new MessageEmbed()
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setColor(member.user.displayHexColor || "BLUE")
      .addField("User", [
        `**❯ Username:** ${member.user.username}`,
        `**❯ Discriminator:** ${member.user.discriminator}`,
        `**❯ ID:** ${member.id}`,
        `**❯ Flags:** ${
          userFlags.length
            ? userFlags.map((flag) => flags[flag]).join(", ")
            : "None"
        }`,
        `**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({
          dynamic: true,
        })})`,
        `**❯ Time Created:** ${moment(member.user.createdTimestamp).format(
          "LT"
        )} ${moment(member.user.createdTimestamp).format("LL")} ${moment(
          member.user.createdTimestamp
        ).fromNow()}`,
        `**❯ Status:** ${member.user.presence.status}`,
        `\u200b`,
      ])
      .addField("Member", [
        `**❯ Highest Role:** ${
          member.roles.highest.id === message.guild.id
            ? "None"
            : member.roles.highest.name
        }`,
        `**❯ Server Join Date:** ${moment(member.joinedAt).format("LL LTS")}`,
        `**❯ Hoist Role:** ${
          member.roles.hoist ? member.roles.hoist.name : "None"
        }`,
        `**❯ Roles [${roles.length}]:** ${
          roles.length <= 10
            ? roles.join(", ")
            : roles.length >= 10
            ? this.client.utils.trimArray(roles)
            : "None"
        }`,
        `\u200b`,
      ])
      .setTimestamp();

    return message.channel.send(embed);
  }
};
