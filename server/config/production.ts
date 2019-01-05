import Common, { IConfig } from './common'
export default class Production extends Common implements IConfig {
    databaseConnection = {
        connectionLimit: 10,
        host: 'ryvdxs57afyjk41z.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'by7yr5jcedktdzgu',
        password: 'cdk0c2azxi2j78xf',
        database: 'pm7dunybrfnesp9s',
    }

    client = 'https://shrouded-island-14882.herokuapp.com'
    port = 5001
}
