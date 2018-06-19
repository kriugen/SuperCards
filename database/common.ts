export const dt_escape = (val: string) => {
    return val.slice(0, 19).replace('T', ' ')
}

export const addDays = (date: Date, days: number) => {
    date.setDate(date.getDate() + days)
    return date
}