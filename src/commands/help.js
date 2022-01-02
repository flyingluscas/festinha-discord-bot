const help = ({ textChannel }) =>
  textChannel.send(
    'Available commands are `-play`, `-stop`, `-queue`, `-skip`, `-shuffle`, `-pause`, `-resume`, and `-clear`.',
  )

module.exports = help
