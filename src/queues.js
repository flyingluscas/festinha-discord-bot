const queues = {}

const getOrCreateQueueForGuild = async (options) => {
  const { guildId, textChannel, voiceChannel } = options
  const queue = getQueueForGuild(guildId)

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

  return getOrCreateQueueForGuild(options)
}

const getQueueForGuild = (guildId) => queues[guildId] || null

const destroyQueue = (guildId) => delete queues[guildId]

module.exports = {
  getQueueForGuild,
  getOrCreateQueueForGuild,
  destroyQueue,
}
