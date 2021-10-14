const { getQueueForGuild } = require('../queues')

const clear = async (options) => {
  const { guildId, textChannel, author } = options

  const queue = await getQueueForGuild(guildId)

  if (!queue || !queue.songs.length) {
    return textChannel.send(
      `**${author.username}**, the queue is already cleared ;)`,
    )
  }

  queue.songs = []

  queue.voiceConnection.dispatcher.end()

  return textChannel.send(
    `**${author.username}**, the queue has been cleared ;)`,
  )
}

module.exports = clear
