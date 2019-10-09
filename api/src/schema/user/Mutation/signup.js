import {A,H,R,bcrypt,CONST} from 'common'

const _1a = `
  MATCH (u:User) WHERE u.username = $username RETURN u
`

const _1b = `
  MATCH (la:LocalAccount {email: $email})
  RETURN la
`
const _2 = `
  CREATE (u:User {username: $username})
  -[:AUTHENTICATED_WITH]->
  (l:LocalAccount {hashedPassword: $hashedPassword, email: $email})
  RETURN u
`

const signup = async (_, {input: {username, email, password}}, {session}) => {
  const

  /* Check if email is free */
  {records: recs2} = await session.run (_1b, {email}),
  [] = [H.assert (R.isEmpty (recs2)) (CONST.email_taken (email))],

  /* Check if username is free */
  {records: recs1} = await session.run (_1a, {username}),
  [] = [H.assert (R.isEmpty (recs1)) (CONST.username_taken (username))],

  /* Hash password */
  hashedPassword = await bcrypt.hash (password, 12),

  /* Save user to db! */
  [] = [await session.run (_2, {username, email, hashedPassword})]

  /* Grant jwt */
  /* `dteiml` is ADMIN (can add new topics) */
  return username === `dteiml`
    ? await A.createToken (process.env.JWT_SECRET, {roles: [`ADMIN`]}) 
    : await A.createToken (process.env.JWT_SECRET, {})
}

export default H.wrapInResponse (signup)