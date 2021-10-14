const { getQueueForGuild, destroyQueue } = require('../queues')

const stop = async (options) => {
  const { guildId, textChannel, author } = options

  const queue = await getQueueForGuild(guildId)

  if (!queue || !queue.songs.length) {
    return textChannel.send(
      `**${author.username}**, there is no queue to stop ;)`,
    )
  }

  queue.songs = []

  if (queue.voiceConnection.dispatcher) {
    queue.voiceConnection.dispatcher.end()
  }

  queue.voiceChannel.leave()

  destroyQueue(guildId)

  return textChannel.send(
    `**${author.username}**, the queue has been stoped ;)`,
  )
}

module.exports = stop
