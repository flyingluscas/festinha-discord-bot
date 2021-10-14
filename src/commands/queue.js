const { getQueueForGuild } = require('../queues')

const queue = async (options) => {
  const { guildId, textChannel, author } = options

  const queue = await getQueueForGuild(guildId)

  if (!queue || !queue.songs.length) {
    return textChannel.send(
      `**${author.username}**, the queue is empty, try the \`-play\` command to add more songs!`,
    )
  }

  const songsList = queue.songs
    .map(({ title }, index) => {
      const number = index + 1
      const songTitle = index === 0 ? `**${title}**` : title

      return `${number}. ${songTitle}`
    })
    .join('\n')

  return textChannel.send(`
**(${queue.songs.length}) Songs:**
${songsList}
  `)
}

module.exports = queue
