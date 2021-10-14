const { getQueueForGuild } = require('../queues')

const skip = async (options) => {
  const { guildId, textChannel, author } = options

  const queue = await getQueueForGuild(guildId)

  if (!queue || queue.songs.length <= 1) {
    return textChannel.send(
      `**${author.username}**, there are no songs left to skip ;)`,
    )
  }

  queue.voiceConnection.dispatcher.end()
}

module.exports = skip
