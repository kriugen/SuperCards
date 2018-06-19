import * as mysql from 'mysql'
import { Id } from '../types'
import config from './config'
import { dt_escape } from '../database/common'

var pool = mysql.createPool(config.databaseConnection)

export const escape = (val: any, name?: string) => {
    if (name && name.startsWith('dt_') && val) {
        val = dt_escape(val)
    }

    return mysql.escape(val)
}

export const selectOne = (sql: string) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, (e, rows) => {
            if (e) {
                reject(e)
                return
            }

            if (rows.length == 0) {
                reject('One element expected, none returned ' + sql)
                return
            }

            if (rows.length > 1) {
                reject(`One element expected, ${rows.length} returned ` + sql)
                return
            }

            resolve(rows[0])
        })
    })
}

export const select = (sql: string) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, (e, rows) => {
            if (e) {
                reject(e)
                return
            }

            resolve(rows)
        })
    })
}

type KeysValues = {
    keys: string,
    values: string,
}

export const bulkInsert = (table: string, arr: Array<Object>) => {
    return new Promise((resolve, reject) => {
        if (arr.length == 0) {
            reject('Empty input array')
            return
        }

        var keys_values = parseForInsert(arr[0])
        var values: string = 'VALUES '

        arr.forEach(obj => {
            var objValues = parseForInsert(obj)
            values += '(' + objValues.values + '),'
        })

        values = values.slice(0, values.length - 1)

        var sql = `INSERT INTO ${table} (${keys_values.keys}) ${values}`
        pool.query(sql, (e, data) => {
            if (e) {
                reject(e)
                return
            }

            resolve(data.insertId)
        })
    })
}

export const insert = (table: string, obj: Object) => {
    return new Promise((resolve, reject) => {
        var keys_values = parseForInsert(obj)
        var sql = `INSERT INTO ${table} (${keys_values.keys}) VALUES(${keys_values.values})`
        pool.query(sql, (e, data) => {
            if (e) {
                reject(e)
                return
            }

            resolve(data.insertId)
        })
    })
}

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

export const deleteFrom = (table: string, id: number) => {
    return new Promise((resolve, reject) => {
        var sql = `DELETE FROM ${table} WHERE id=${id}`
        pool.query(sql, (e, data) => {
            if (e) {
                reject(e)
                return
            }

            resolve(data)
        })
    })
}

export const update = (table: string, obj: Id) => {
    return new Promise((resolve, reject) => {
        var sql = `UPDATE ${table} SET ${parseForUpdate(obj)} WHERE id=${obj.id}`
        pool.query(sql, (e, data) => {
            if (e) {
                reject(e)
                return
            }

            resolve(data)
        })
    })
}

var isValOk = (obj: Object, prop: string) => {
    if (prop == 'id' || prop.startsWith('_'))
        return false

    if (obj.hasOwnProperty(prop)) {
        return true
    }

    return false
}

var parseForUpdate = (obj: any) => {
    var items = []
    for (var prop in obj) {
        if (isValOk(obj, prop)) {
            var val = obj[prop]

            val = escape(val, prop)
            items.push(`${prop}=${val}`)
        }
    }

    return items.join(',')
}

var parseForInsert = (obj: any): KeysValues => {
    var keys = []
    var values = []
    for (var prop in obj) {
        if (isValOk(obj, prop)) {
            var val = obj[prop]
            keys.push(prop)

            val = escape(val, prop)
            values.push(val)
        }
    }

    return { keys: keys.join(','), values: values.join(',') }
}