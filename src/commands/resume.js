const { getQueueForGuild } = require('../queues')

const resume = async (options) => {
  const { guildId, textChannel, author } = options

  const queue = await getQueueForGuild(guildId)

  if (!queue || queue.playing === true) {
    return textChannel.send(
      `**${author.username}**, the queue is already playing ;)`,
    )
  }

  if (queue.voiceConnection.dispatcher) {
    queue.voiceConnection.dispatcher.resume()
  }

  queue.playing = true

  return textChannel.send(
    `**${author.username}**, the queue has been resumed ;)`,
  )
}

module.exports = resume
