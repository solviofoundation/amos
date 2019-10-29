import {H} from 'common'
import login from './login'

const handleFacebook = async ({success, message}, _, {cache}) => {
  success |> console.log ('success handleFacebook', #)
  message |> console.log ('message handleFacebook', #)
  return success && do {
    message[0] === `token`
      ? do {
        message |> console.log ('message handleFacebook', #)
        await login ({success, message: message[1]}, _, {cache})
      }
      : do {
        [] = [message |> console.log ('message handleFacebook2', #)],
        cache.writeData ({data: {fbAccessToken: message[1]}})
        H.navto (`/signup/facebook`) ()
      }
  }
}

export default handleFacebook