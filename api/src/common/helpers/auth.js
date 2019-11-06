import * as R from 'ramda'
import jwt from 'jsonwebtoken'

export const createToken = async (secret, user) => await jwt.sign(user, secret, {expiresIn: `90d`})

export const decode = async (driver, authorizationHeader) => {
  if (!authorizationHeader) return null
  const token = R.replace (`Bearer `) (``) (authorizationHeader)
  let id = null
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    id = decoded.sub
  } catch (err) {
    return null
  }
  const session = driver.session()
  const query = `
    MATCH (u:User) where id(u) = toInteger ($id)
    RETURN u
    LIMIT 1
  `
  const {records} = await session.run(query, { id })
  session.close()
  const _user = records[0].get (`u`)
  const user = {..._user.properties, id: _user.identity.low}
  if (!user) return null
  return {
    token,
    ...user,
  }
}