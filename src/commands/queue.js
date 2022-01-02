const { getQueueForGuild } = require('../queues')

const queue = async (options) => {
  const { guildId, textChannel, author } = options

  const queue = await getQueueForGuild(guildId)

  if (!queue || !queue.songs.length) {
    return textChannel.send(
      `**${author.username}**, the queue is empty, try the \`-play\` command to add more songs!`,
    )
  }

  const MAX_SONGS_TO_SHOW = 15

  const songsList = queue.songs
    .slice(0, MAX_SONGS_TO_SHOW)
    .map(({ title }, index) => {
      const number = index + 1
      const songTitle = index === 0 ? `**${title}**` : title

      return `${number}. ${songTitle}`
    })
    .join('\n')

  const title =
    queue.songs.length > MAX_SONGS_TO_SHOW
      ? `(${MAX_SONGS_TO_SHOW} - ${queue.songs.length}) Songs`
      : `(${queue.songs.length}) Songs`

  const queueStatus = queue.playing === true ? 'Playing' : 'Paused'

  return textChannel.send(`
**${title} | ${queueStatus}**
${songsList}
  `)
}

module.exports = queue
