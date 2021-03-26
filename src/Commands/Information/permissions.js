const Command = require("../../Structures/Command"),
  vortexMusicEmbed = require("../../Structures/vortexMusicEmbed");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "perms",
      category: "Information",
    });
  }

  async run(message, args) {
    const member = message.guild.members.cache.get(args[0]) || message.member;
    const permissionsEmbed = new vortexMusicEmbed()
      .setTitle(`${member.user.tag}'\s perms`)
      .setColor("RANDOM")
      .addField(`Permissons:`, [
        `${Object.entries(member.permissions.serialize(" "))
          .join("\n")
          .toLowerCase()}`,
      ]);
    message.channel.send(permissionsEmbed);
  }
};
