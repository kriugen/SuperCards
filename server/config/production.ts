import Common, { IConfig } from './common'
export default class Production extends Common implements IConfig {
    databaseConnection = {
        connectionLimit: 10,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }

    client = process.env.URL
    port = parseInt(process.env.PORT)
    secret = process.env.SECRET
}
