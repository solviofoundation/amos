import {A,H,rp} from 'common'

const _1 = `
  match (fb:FbAccount {userFbId: $userFbId})
  return fb
`

const authFacebook = async (_, {input}, {session}) => {
  const

  {accessToken} = input,

  {data: {user_id: userFbId}} = await rp (
    `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${process.env.APP_ID}|${process.env.APP_SECRET}`
    ) |> JSON.parse,
    
    {records: [fbAccount]} = await session.run (_1, {userFbId}),
    
  // TODO: Check if user has LocalAccount

  message = H.isNotNilOrEmpty (fbAccount)
    ? do {
      const userId = fbAccount.get (`fb`).identity.low
      await A.createToken (process.env.JWT_SECRET, {sub: userId})
    }
    : accessToken

  return {message}
}

export default H.wrapInResponse (authFacebook)