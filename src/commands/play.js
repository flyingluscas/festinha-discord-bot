const ytdl = require('ytdl-core-discord')
const ytpl = require('ytpl')
const ytsr = require('ytsr')
const { getOrCreateQueueForGuild } = require('../queues')

const getSongParameter = (content) => content.split(' ').slice(1).join(' ')

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

const isYouTubeChannelOrPlaylist = (songParameter) =>
  /(list=[\w\W\d\D]+|\/channel\/[\w\W\d\D]+)/.test(songParameter)

const getSongsFromYouTubeChannelOrPlaylist = async (songParameter) => {
  const { title, items } = await ytpl(songParameter)

  if (!items || !items.length) {
    return {
      title: null,
      songs: [],
    }
  }

  return {
    title,
    songs: items.map(({ title, shortUrl }) => ({
      title,
      url: shortUrl,
    })),
  }
}

const play = async (options) => {
  const { content, textChannel, voiceChannel, author, guildId } = options
  const songParameter = getSongParameter(content)

  if (!songParameter) {
    const defaultSongLink = 'https://www.youtube.com/watch?v=z9jmzzESl8k'

    return play({
      content: `-play ${defaultSongLink}`,
      textChannel,
      voiceChannel,
      author,
      guildId,
    })
  }

  const queue = await getOrCreateQueueForGuild({
    guildId,
    textChannel,
    voiceChannel,
  })

  if (isYouTubeChannelOrPlaylist(songParameter)) {
    const { title, songs } = await getSongsFromYouTubeChannelOrPlaylist(
      songParameter,
    )

    if (!songs.length) {
      return textChannel.send(
        `Sorry **${author.username}**, but I couldn't find any songs :/`,
      )
    }

    if (queue.songs.length) {
      queue.songs.push(...songs)

      return textChannel.send(
        `Playlist **${title}** was added to the queue! To see all queued songs type \`-queue\`.`,
      )
    }

    queue.songs.push(...songs)

    return playNextSongInQueue({ queue, textChannel })
  }

  const song = await getSongFromYouTube(songParameter)

  if (!song) {
    return textChannel.send(
      `Sorry **${author.username}**, but I couldn't find this song :/`,
    )
  }

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
