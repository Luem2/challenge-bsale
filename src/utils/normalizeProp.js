export function normalizeProp(prop) {
    return prop.replace(/_[a-z]/g, function (match) {
        return match[1].toUpperCase()
    })
}
