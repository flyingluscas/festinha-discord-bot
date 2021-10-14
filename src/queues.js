const queues = {}

const getQueueForGuild = async (options) => {
  const { guildId, textChannel, voiceChannel } = options
  const queue = queues[guildId]

  if (queue) {
    return queue
  }

  const voiceConnection = await voiceChannel.join()

  queues[guildId] = {
    textChannel,
    voiceChannel,
    voiceConnection,
    songs: [],
    volume: 0.5,
    playing: true,
  }

  return getQueueForGuild(options)
}

module.exports = {
  getQueueForGuild,
}
