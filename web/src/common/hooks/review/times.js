import {R, H, React} from 'common'

const times = (props) => {
  const

  /* eslint-disable no-shadow */
  [times, setTimes] = React.useState (1),
  {valid} = props,

  lastIndex = R.findLastIndex (R.identity) (valid),

  [] = [lastIndex + 2 > times && setTimes (lastIndex + 2)]
  return R.merge ({times}) (props)
}

export default times