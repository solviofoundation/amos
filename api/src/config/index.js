import {H, R,dotenv} from 'common'

dotenv.config()

const {env} = process

const {
  // MAPBOX_TOKEN,
  JWT_SECRET = `secret`,
  // PRIVATE_KEY_PASSPHRASE,
  // SMTP_IGNORE_TLS = true,
  // SMTP_HOST,
  // SMTP_PORT,
  // SMTP_USERNAME,
  // SMTP_PASSWORD,
  // SENTRY_DSN_BACKEND,
  // COMMIT,
  NEO4J_URI,
  NEO4J_USERNAME,
  NEO4J_PASSWORD,
  GRAPHQL_PORT,
  CLIENT_URI,
} = env

export const requiredConfigs = {JWT_SECRET}
// export const smtpConfigs = {
//   SMTP_HOST,
//   SMTP_PORT,
//   SMTP_IGNORE_TLS,
//   SMTP_USERNAME,
//   SMTP_PASSWORD,
// }
export const neo4jConfigs = {NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD}
export const serverConfigs = {GRAPHQL_PORT, CLIENT_URI}

export const developmentConfigs = {
  DEBUG: R.and (H.neq (env.NODE_ENV) (`production`)) (env.DEBUG),
  DISABLED_MIDDLEWARES:
    (env.NODE_ENV !== `production` && env.DISABLED_MIDDLEWARES) || ``,
}

// export const sentryConfigs = { SENTRY_DSN_BACKEND, COMMIT }

export default R.mergeAll([
  requiredConfigs,
  // smtpConfigs,
  neo4jConfigs,
  serverConfigs,
  developmentConfigs,
  // sentryConfigs,
])
