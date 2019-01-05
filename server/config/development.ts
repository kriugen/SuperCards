import Common, { IConfig } from './common'
export default class Development extends Common implements IConfig {
    databaseConnection = {
        connectionLimit: 10,
        host:'localhost',
        user: 'root',
        password: 'root',
        database: 'super_cards',
        timezone: 'UTC+0'
    }

    client = 'http://localhost:8080'
    port = 5000
    secret = '14278a17-8772-4804-9f75-f06009e38141'
}