const { getQueueForGuild } = require('../queues')

const shuffle = async (options) => {
  const { guildId, textChannel, author } = options

  const queue = await getQueueForGuild(guildId)

  if (!queue || queue.songs.length <= 1) {
    return textChannel.send(
      `**${author.username}**, there are no songs to shuffle, type \`-play\` to add more songs!`,
    )
  }

  queue.songs = queue.songs.sort(() => Math.random() - 0.5)

  return textChannel.send(
    `**${author.username}**, the queue has been shuffled!`,
  )
}

module.exports = shuffle
