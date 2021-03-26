const Event = require("../Structures/Event"),
  { MessageEmbed } = require("discord.js");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: true,
    });
  }

  async run(message, args) {

    // Send a message when something is added to the queue
    this.client.player.on("trackAdd", (message, queue, track) =>
      message.channel.send(`${track.title} has been added to the queue!`)
    );
    this.client.player.on("playlistAdd", (message, queue, playlist) =>
      message.channel.send(
        `${playlist.title} has been added to the queue (${playlist.tracks.length} songs)!`
      )
    );

    // Send messages to format search results
    this.client.player.on("searchResults", (message, query, tracks) => {
      const embed = new MessageEmbed()
        .setAuthor(`Here are your search results for ${query}!`)
        .setDescription(tracks.map((t, i) => `${i}. ${t.title}`))
        .setFooter("Send the number of the song you want to play!");
      message.channel.send(embed);
    });
    this.client.player.on(
      "searchInvalidResponse",
      (message, query, tracks, content, collector) => {
        if (content === "cancel") {
          collector.stop();
          return message.channel.send("Search cancelled!");
        }

        message.channel.send(
          `You must send a valid number between 1 and ${tracks.length}!`
        );
      }
    );
    this.client.player.on("searchCancel", (message, query, tracks) =>
      message.channel.send(
        "You did not provide a valid response... Please send the command again!"
      )
    );
    this.client.player.on("noResults", (message, query) =>
      message.channel.send(`No results found on YouTube for ${query}!`)
    );

    // Send a message when the music is stopped
    this.client.player.on("queueEnd", (message, queue) =>
      message.channel.send(
        "Music stopped as there is no more music in the queue!"
      )
    );
    this.client.player.on("channelEmpty", (message, queue) =>
      message.channel.send(
        "Music stopped as there is no more member in the voice channel!"
      )
    );
    this.client.player.on("botDisconnect", (message) =>
      message.channel.send(
        "Music stopped as I have been disconnected from the channel!"
      )
    );

    // Error handling
    this.client.player.on("error", (error, message) => {
      switch (error) {
        case "NotPlaying":
          message.channel.send(
            "There is no music being played on this server!"
          );
          break;
        case "NotConnected":
          message.channel.send("You are not connected in any voice channel!");
          break;
        case "UnableToJoin":
          message.channel.send(
            "I am not able to join your voice channel, please check my permissions!"
          );
          break;
        case "LiveVideo":
          message.channel.send("YouTube lives are not supported!");
          break;
        case "VideoUnavailable":
          message.channel.send("This YouTube video is not available!");
          break;
        default:
          message.channel.send(`Something went wrong... Error: ${error}`);
      }
    });

    this.client.on("voiceStateUpdate", (oS, nS) => {
      const u = nS.member.user.tag;
      const i = nS.member.user.id;
      const gN = nS.guild.name;
      const gI = nS.guild.id;

      //User joined/left a channel
      if ((!oS.channelID && nS.channelID) || (oS.channelID && !nS.channelID))
        return this.client.logger.log(
          `\n---------\n${u}\t(${i}) ${nS.channelID
            ? `joined channel ${nS.channel.name} in guild ${gN}\n(${gI})`
            : `left channel ${oS.channel.name}`
          }`
        );

      //User started/stopped streaming to a guild
      if ((!oS.streaming && nS.streaming) || (oS.streaming && !nS.streaming))
        return this.client.logger.log(
          `\n---------\n${u}\t(${i}) has ${nS.streaming ? "started" : "stopped"
          } streaming! in guild ${gN}\n(${gI})`
        );

      //User was meafend/undeafend by an Moderator
      if (
        (!oS.serverDeaf && nS.serverDeaf) ||
        (oS.serverDeaf && !nS.serverDeaf)
      )
        return this.client.logger.log(
          `\n---------\n${u}\t(${i}) was ${nS.serverDeaf ? "Server" : "un"
          }deafed in guild ${gN}\n(${gI})`
        );

      //User was muted/unmuted by an Moderator
      if (
        (!oS.serverMute && nS.serverMute) ||
        (oS.serverMute && !nS.serverMute)
      )
        return this.client.logger.log(
          `\n---------\n${u}\t(${i}) was ${nS.serverMute ? "Server" : "un"
          }muted in guild ${gN}\n(${gI})`
        );

      //User deafened/undeafened himself
      if ((!oS.selfDeaf && nS.selfDeaf) || (oS.selfDeaf && !nS.selfDeaf))
        return this.client.logger.log(
          `\n---------\n${u}\t(${i}) has ${nS.selfDeaf ? "" : "un"
          }deafed their self in guild ${gN}\n(${gI})`
        );

      //User muted/unmuted himself
      if ((!oS.selfMute && nS.selfMute) || (oS.selfMute && !nS.selfMute))
        return this.client.logger.log(
          `\n---------\n${u}\t(${i}) has ${nS.selfMute ? "" : "un"
          }muted their self in guild ${gN}\n(${gI})`
        );

      //User started/stopped his Videofeed
      if ((!oS.selfVideo && nS.selfVideo) || (oS.selfVideo && !nS.selfVideo))
        return this.client.logger.log(
          `\n---------\n${u}\t(${i}) has ${nS.selfVideo ? "started" : "stopped"
          } Video Sharing in guild ${gN}\n(${gI})`
        );

      //User switched channels
      if (oS.channelID !== nS.channelID && oS.channelID && nS.channelID)
        return this.client.logger.log(
          `\n---------\n${u}\t(${i}) switched voice channels in guild ${gN}\n(${gI}) old: ${oS.channel.name} new: ${nS.channel.name}`
        );
    });

    const guildJoinChannel = "816815152006430772";
    const guildLeaveChannel = "816815152006430772";

    this.client.on("guildCreate", (guild) => {
      const members = guild.members.cache;

      this.client.logger.log(
        `I have been added to '${guild.name}' (${guild.id}) with ${guild.memberCount} members!, the owner is ${guild.owner.user.tag} (${guild.owner.id})`
      );

      const f = new MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(guild.iconURL({ dynamic: true, size: 512 }))
        .addField(`New guild joined:`, [
          `Name: ${guild.name}`,
          `ID: ${guild.id}`,
          `Owner: ${guild.members.cache.get(guild.ownerID).user.tag}`,
          `Owner ID: ${guild.ownerID}`,
          `Member Count: ${guild.memberCount.toLocaleString()}`,
          `Humans: ${members
            .filter((member) => !member.user.bot)
            .size.toLocaleString()}`,
          `Bots: ${members
            .filter((member) => member.user.bot)
            .size.toLocaleString()}`,
        ]);
      this.client.channels.cache.get(guildJoinChannel).send(f);
    });

    this.client.on("guildDelete", (guild) => {
      this.client.logger.log(
        `I have been removed from '${guild.name}' (${guild.id}) with ${guild.memberCount} members! the owner is ${guild.owner.user.tag} (${guild.owner.id})`
      );
      const a = new MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(guild.iconURL({ dynamic: true, size: 512 }))
        .addField(`New guild Leave:`, [
          `Name: ${guild.name}`,
          `ID: ${guild.id}`,
          `Owner: ${guild.members.cache.get(guild.ownerID).user.tag}`,
          `Owner ID: ${guild.ownerID}`,
        ]);
      this.client.channels.cache.get(guildLeaveChannel).send(a);
    });

    this.log();

    const activities = [
      `${this.client.guilds.cache.size.toLocaleString()} servers!`,
      `${this.client.channels.cache.size.toLocaleString()} channels!`,
      `${this.client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString()} users!`,
    ];
    this.activity(activities);
  }

  activity(activities) {
    let i = 0;
    setInterval(
      () =>
        this.client.user.setActivity(
          `${this.client.prefix}help | ${activities[i++ % activities.length]}`,
          { type: "WATCHING" }
        ),
      15000
    );
  }

  log() {
    this.client.logger.log(
      [
        `Logged in as ${this.client.user.tag}`,
        `Loaded ${this.client.commands.size} commands!`,
        `Loaded ${this.client.events.size} events!`,
        `Serving ${this.client.users.cache.size.toLocaleString()} members!`,
        `Serving ${this.client.guilds.cache.size.toLocaleString()} guilds!`,
        `Client ID: ${this.client.user.id}`,
        `invite: https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=8`,
      ].join("\n")
    );
    this.console();
  }

  console() {
    this.client.logger.log(
      `\nServers[${this.client.guilds.cache.size.toLocaleString()}]: \n---------\n${this.client.guilds.cache
        .map(
          (guild) =>
            `${guild.id +
            "\t" +
            guild.name +
            "   |   " +
            guild.memberCount.toLocaleString()
            } mem\'s`
        )
        .join("\n")}`
    );
  }
};
