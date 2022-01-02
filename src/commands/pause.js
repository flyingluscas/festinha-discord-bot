const { getQueueForGuild } = require('../queues')

const pause = async (options) => {
  const { guildId, textChannel, author } = options

  const queue = await getQueueForGuild(guildId)

  if (!queue || queue.playing === false) {
    return textChannel.send(
      `**${author.username}**, there are no songs playing ;)`,
    )
  }

  if (queue.voiceConnection.dispatcher) {
    queue.voiceConnection.dispatcher.pause()
  }

  queue.playing = false

  return textChannel.send(
    `**${author.username}**, the queue has been paused, use \`-resume\` to resume ;)`,
  )
}

module.exports = pause
