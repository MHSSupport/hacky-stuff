const vortexMusicClient = require("./Structures/vortexMusicClient"),
  config = require("../config.json"),
  client = new vortexMusicClient(config),
  { Player } = require("discord-player"),
  fs = require("fs"),
  { MessageEmbed } = require("discord.js");

client.player = new Player(client);

client
  .on("disconnect", () => client.logger.warn("Bot is disconnecting . . ."))
  .on("reconnecting", () => client.logger.log("Bot reconnecting . . ."))
  .on("rateLimit", (info) => client.logger.warn(info))
  .on("error", (e) => client.logger.error(e))
  .on("debug", (info) => {
   // client.logger.debug(info);
    const loading = info.match(/\[WS => Shard (\d+)] \[CONNECT]/),
      sessions = info.match(/Remaining: (\d+)$/),
      reconnect = info.match(
        /\[WS => Shard (\d+)] \[RECONNECT] Discord asked us to reconnect/
      ),
      swept = info.match(
        /Swept \d+ messages older than \d+ seconds in \d+ text-based channels/
      ),
      discard = info.match(/\[WS => (Shard (\d+)|Manager)]/);
    if (loading) return client.logger.log(`Loading . . .`);
    if (sessions)
      return client.logger.debug(
        `Session ${1000 - parseInt(sessions[1], 10)} of 1000`
      );
    if (reconnect)
      return client.logger.log(
        `Discord asked shard ${reconnect[1]} to reconnect`
      );
    if (swept) return client.logger.log(info);
    if (discard) return;
    if (
      info.match(
        /\[WS => Shard \d+] (?:\[HeartbeatTimer] Sending a heartbeat\.|Heartbeat acknowledged, latency of \d+ms\.)/
      )
    )
      return;
    if (info.startsWith("429 hit on route")) return;
  })
  .on("warn", (info) => client.logger.warn(info))
  .on("shardReady", () => client.logger.ready(`Connected!`))
  .on("shardResume", () => client.logger.ready(`Connected!`));

process.on("unhandledRejection", (err) => client.logger.error(err));

client.start();
