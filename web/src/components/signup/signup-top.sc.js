import {
  H,
  Panel, Checkbox, Button, AuthOptions, Input
} from 'common'

const Top_ = H.css`
  ${Panel}

  ${Input} {
    margin-top: 24px;
  }

  ${Checkbox} {
    margin-top: 36px;
  }

  ${Button} {
    margin-top: 30px;
  }

  ${AuthOptions} {
    margin-top: 24px;
  }
`

export default Top_
