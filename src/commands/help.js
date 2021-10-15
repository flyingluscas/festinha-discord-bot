const help = ({ textChannel }) =>
  textChannel.send(
    'Available commands are `-play`, `-stop`, `-queue`, `-skip`, `-shuffle` and `-clear`.',
  )

module.exports = help
