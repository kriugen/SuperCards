export interface IDbConnection {
    connectionLimit: number,
    host: string,
    user: string,
    password: string,
    database: string,
}

export interface IConfig {
    downloadFolder: string,
    databaseConnection: IDbConnection,
    client: string,
    port: number,
}

export default class Common {
    downloadFolder = './downloads/'
}