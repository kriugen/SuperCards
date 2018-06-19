interface Meta {
    length: number,
    required?: boolean,
}

export interface MetaIndexer {
    [name: string]: Meta
}

export const SmallText = 45
export const LargeText = 65536
export const RequestLimit = 4*LargeText + 2*SmallText //based on max card size
+ LargeText //to make sure extra data is accomodated (id, user_id etc.)

var error = (col: string, text: string) => {
    return `${col} ${text}`
}

export const validate = (obj: any, objMeta: any) => {
    var errors = []

    for (var prop in objMeta) {
        var meta = objMeta[prop]
        var val = obj[prop]
   
        if (!val && meta.required) {
            errors.push(error(prop, `value is required`))
            continue
        }

        if (meta.length < val.length) {
            errors.push(error(prop, `max length ${meta.length}, actual length ${val.length}`))
            continue
        }

        if (meta.validator && !meta.validator(val)) {
            errors.push(error(prop, 'value is invalid'))
        }
    }

    return errors
}

export default validate