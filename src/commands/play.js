const ytdl = require('ytdl-core-discord')
const ytsr = require('ytsr')
const { getQueueForGuild } = require('../queues')

const getSongName = (content) => content.split(' ').slice(1).join(' ')

const getSongFromYouTube = async (songName) => {
  const { results, items } = await ytsr(songName)

  if (!results) {
    return null
  }

  const [{ title, url }] = items

  if (!url) {
    return null
  }

  return { title, url }
}

const playNextSongInQueue = async (options) => {
  const { queue, textChannel } = options
  const { songs, volume, voiceConnection } = queue

  if (!songs.length) {
    return
  }

  const [song] = songs
  const songStream = await ytdl(song.url)

  voiceConnection
    .play(songStream, { type: 'opus' })
    .on('finish', () => {
      songs.shift()
      playNextSongInQueue(options)
    })
    .setVolume(volume)

  return textChannel.send(`Now playing **${song.title}**`)
}

const play = async (options) => {
  const { content, textChannel, voiceChannel, author, guildId } = options
  const songName = getSongName(content)

  if (!songName) {
    return textChannel.send(
      `${author.username}, I need a song name or YouTube link!`,
    )
  }

  const song = await getSongFromYouTube(songName)

  if (!song) {
    return textChannel.send(
      `**${author.username}**, sorry but I couldn't find this song :/`,
    )
  }

  const queue = await getQueueForGuild({
    guildId,
    textChannel,
    voiceChannel,
  })

  if (queue.songs.length) {
    queue.songs.push(song)

    return textChannel.send(
      `**${song.title}** was added to the queue! To see all queued songs type \`-queue\`.`,
    )
  }

  queue.songs.push(song)

  return playNextSongInQueue({ queue, textChannel })
}

module.exports = play
