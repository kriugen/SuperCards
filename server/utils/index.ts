export const toInt = (text: string) => {
    var result = parseInt(text, 10)
    if (isNaN(result))
        throw(`Argument '${text}' is not a number`)
    return result
}