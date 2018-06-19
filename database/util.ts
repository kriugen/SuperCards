import * as mysql from 'mysql'
import config from '../server/config'
var connection = Object.assign({}, config.databaseConnection, { multipleStatements: true })
var pool = mysql.createPool(connection)

export const query = (sql: string) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, (e, data) => {
            if (e) {
                reject(e)
                return
            }

            resolve(data)
        })
    })
}

export const cleanup = (...args: Array<string>) => {

    var tables
    if (!args.length) {
        tables = ['cards', 'users']
    } else {
        tables = [...args]
    }

    var truncates = ''
    tables.forEach(table => truncates += 'TRUNCATE ' + table + ';')
    return query(`SET FOREIGN_KEY_CHECKS = 0;
            ${truncates}
            SET FOREIGN_KEY_CHECKS = 1;`)
}