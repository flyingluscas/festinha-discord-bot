const help = ({ textChannel }) =>
  textChannel.send(
    'Available commands are `-play`, `-stop`, `-queue`, `-skip` and `-clear`.',
  )

module.exports = help
