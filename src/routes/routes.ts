import { Router } from 'express'
import { TodoController } from '../controllers/todoController'

const router = Router()

const todoController = new TodoController()

router.get('/', (request, response) => {
  response.json({ success: false })
})
//LISTA COISAS
router.get('/todos', todoController.listAllTodos)

//CRIA COISAS
router.post('/todos', todoController.createToDo)

//LISTA UMA TODO POR ID
router.get('/todos/:id', todoController.findTodoById)

//EIDTA UMA TODO POR ID
router.put('/todos/:id',todoController.updateTodo)

//DELETE UMA TODO POR ID
router.delete('/todos/:id', todoController.deleteTodo)

export default router