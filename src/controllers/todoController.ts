import { Request, Response } from "express";
import { Todo } from "../interfaces/todo";
import { CreateTodoDto } from "../dto/createToDoDto";
import { randomUUID } from "crypto";
import { validate } from 'uuid'
import { prismaClient } from "../database/client";

export class TodoController {
  public listAllTodos = async (request: Request, response: Response) => {
    const allTodos = await prismaClient.todo.findMany()

    return response.json(allTodos)
  }

  public createToDo = async (request: Request, response: Response) => {
    const data: CreateTodoDto = request.body

    if(!data.title || !data.description) {
      return response.status(400).json({ message: 'Dados obrigatórios não preenchidos' })
    }

    const newTodo: Todo = {
      id: randomUUID(),
      createdAt: new Date(),
      description: data.description,
      title: data.title
    } 

    await prismaClient.todo.create({ data: newTodo })

    return response.status(201).json(newTodo)
  }

  public async findTodoById(request: Request, response: Response) {
    const { id } = request.params;

    const isUuid = validate(id)

    if(!isUuid) {
      return response.status(400).json({ message: 'Invalid id' })
    }

    const todoById = await prismaClient.todo.findUnique({ where: { id } })

    if(!todoById) {
      return response.status(404).json({ message: 'User not found' })
    }

    return response.status(200).json(todoById)
  }

  public async updateTodo(request: Request, response: Response) {
    const { id } = request.params;
    const data: CreateTodoDto = request.body;

    const isUuid = validate(id)

    if(!isUuid) {
      return response.status(400).json({ message: 'Invalid id' })
    }

    const todoById = await prismaClient.todo.findUnique({ where: { id } })

    if(!todoById) {
      return response.status(404).json({ message: 'User not found' })
    }

    const updatedTodo = await prismaClient.todo.update({
      where: { id },
      data,
    })

    return response.status(200).json(updatedTodo)
  }

  public async deleteTodo(request: Request, response: Response) {
    const { id } = request.params;

    const isUuid = validate(id)

    if(!isUuid) {
      return response.status(400).json({ message: 'Invalid id' })
    }

    const todoById = await prismaClient.todo.findUnique({ where: { id } })

    if(!todoById) {
      return response.status(404).json({ message: 'User not found' })
    }

     await prismaClient.todo.delete({
      where: { id },
    })

    return response.status(200).send()
  }
}