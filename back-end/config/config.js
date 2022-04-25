const dbConfig = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    database: 'generate',
    password: '88888888',
    connectionLimit: 50
}

function getToken(ctx, opt) {
  try {
    const token = ctx.header.authorization.replace('Bearer ', '')
    return token
  } catch (e) {
    return null
  }
}

const tokenConfig = {
  privateKey: 'generate',
  unless: [/\/user\/login/, /\/user\/register/, /\/work\/preview/, /\/swagger/],
  getToken
}

module.exports = {
  dbConfig,
  tokenConfig
}
