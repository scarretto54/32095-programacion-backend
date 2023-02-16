exports.asPOJO = obj => JSON.parse(JSON.stringify(obj))

exports.renameField = (record, from, to) => {
    record[to] = record[from]
    delete record[from]
    return record
}
exports.removeField = (record, field) => {
    const value = record[field]
    delete record[field]
    return value
}
