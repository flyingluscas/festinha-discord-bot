const { getQueueForGuild } = require('../queues')

const skip = async (options) => {
  const { guildId, textChannel, voiceChannel, author } = options

  const queue = await getQueueForGuild({
    guildId,
    textChannel,
    voiceChannel,
  })

  if (queue.songs.length <= 1) {
    return textChannel.send(
      `Sorry **${author.username}**, there are no songs left to skip ;)`,
    )
  }

  queue.voiceConnection.dispatcher.end()
}

module.exports = skip
