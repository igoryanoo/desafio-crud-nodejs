import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/buildRoutePath'

export const routes = [
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const {title, description}= req.body

            const task = {
                id: randomUUID(),
                title,
                description,
                created_at,
                updated_at,
                completed_at,
            }

            database.insert('tasks', task)

            return res.writeHead(201).end("Tarefa criada com sucesso")
        }
    },
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query

            const tasks = database.select('tasks', search ? {
                title: search,
                description: search
            } : null)

            return res.end(JSON.stringify(tasks))
        }
    },
    // - ANTIGO -
    // {
    //     method: 'PUT',
    //     path: buildRoutePath('/tasks/:id'),
    //     handler: (req, res) => {
    //         const { id } = req.params
    //         const { title, description } = req.body

    //         const tasks_id = database.select('tasks')
            
    //         try {
    //             if (tasks_id.find((task) => task.id === id)) {
    //                 database.update('tasks', id, {
    //                 title,
    //                 description,
    //                 })
    //             }
    //         } catch {
    //             return res.writeHead(200).end("Tarefa não encontrada")
    //         }
            

    //         return res.writeHead(204).end('')
    //     }
    // },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const { title, description } = req.body
            
            const task = validator_id(database, 'tasks', id, res)
            
            if(!task) {
                return
            }

            database.update('tasks', id, {
            title,
            description,
            })

            return res.writeHead(204).end('')
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res => {
            const { id } = req.params

            const task = validator_id(database, 'tasks', id, res)
            
            if(!task) {
                return
            }

            database.delete('tasks', id)

            return res.writeHead(204).end()
        })
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/completea'),
        handler: (req, res) => {
            const { id } = req.params
            const { completed_at } = req.body
            
            const task = validator_id(database, 'tasks', id, res)
            
            if(!task) {
                return
            }

            database.update('tasks', id, {
            title,
            description,
            })

            return res.writeHead(204).end('')
        }
    }
]