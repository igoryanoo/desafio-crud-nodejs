export function validator_id(database, table, id, res) {
    const records = database.select(table)
    const found = records.find(item => item.id === id)

    if (!found) {
        return res.writeHead(404).end("Tarefa não encontrada")
    }

    return found
}