const { Client } = require('discord.js')

const commands = require('./commands')

const { DISCORD_TOKEN } = process.env

const client = new Client()

client.on('ready', () => {
  console.info(`Bot running as ${client.user.tag}!`)
})

client.on('message', async (message) => {
  const { content, author, member, channel, guild } = message
  const {
    voice: { channel: voiceChannel },
  } = member

  if (!content.startsWith('-')) {
    return false
  }

  if (!voiceChannel) {
    return channel.send(
      `**${author.username}**, you must be on a voice channel to execute this command.`,
    )
  }

  const permissions = voiceChannel.permissionsFor(client.user)
  const isMissingRequiredPermissions =
    !permissions.has('CONNECT') || !permissions.has('SPEAK')

  if (isMissingRequiredPermissions) {
    return channel.send(
      `Sorry, but I don't have the required permissions to operate in this server!`,
    )
  }

  const commandName = content.split(' ').shift().substr(1)
  const command = commands[commandName]

  if (!command) {
    return channel.send(
      `Sorry **${author.username}**, I don't have this command, use \`-help\` to see available commands.`,
    )
  }

  return command({
    content,
    guildId: guild.id,
    textChannel: channel,
    voiceChannel,
    author,
  }).catch((error) => {
    console.error(error)

    return channel.send(
      `Sorry **${author.username}**, but something went wrong :(.`,
    )
  })
})

client.login(DISCORD_TOKEN)
