const { Client } = require('discord.js')

const commands = require('./commands')

const { DISCORD_TOKEN } = process.env

const client = new Client()

client.on('ready', () => {
  console.info(`Bot running as ${client.user.tag}!`)
})

client.on('message', (message) => {
  const { content, author, member, channel } = message

  if (!content.startsWith('-')) {
    return false
  }

  if (!member.voice.channel) {
    return channel.send(
      `${author.username}, you must be on a voice channel to execute this command.`,
    )
  }

  const commandName = content.split(' ').shift().substr(1)
  const command = commands[commandName]

  if (!command) {
    return channel.send(
      `Sorry ${author.username}, I don't have this command, use -help to see available commands.`,
    )
  }

  return command({
    content,
    author,
    member,
    channel,
  })
})

client.login(DISCORD_TOKEN)
