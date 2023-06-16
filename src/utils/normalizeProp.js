export function normalizeProp(prop) {
    return prop.replace(/_[a-z]/g, function (match) {
        return match[1].toUpperCase()
    })
}

export function normalizeData(data) {
    if (Array.isArray(data)) return data.map((obj) => normalizeData(obj))
    else if (typeof data === 'object') {
        return Object.keys(data).reduce((acc, key) => {
            const camelCaseKey = normalizeProp(key)
            const value = data[key]

            acc[camelCaseKey] = value ? normalizeData(value) : null

            return acc
        }, {})
    }

    return data
}
