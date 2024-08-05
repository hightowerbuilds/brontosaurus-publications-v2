// local api - written in typscript

import axios from "axios"
import { Todo } from "../types/todo"



const BASE_URL = "http://localhost:8080"
const axiosInstance = axios.create({baseURL: BASE_URL})

export const getTodosIds = async () => {
    return (await axiosInstance.get<Todo[]>('todos')).data.map((todo) => {return todo.id})
}

export const getTodo = async (id: number) => {
    return (await axiosInstance.get<Todo[]>(`todos/${id}`)).data
}

export const createTodo = async (data: Todo) => {
    await axiosInstance.post<Todo[]>('todos', data)
}

export const updateTodo = async (data: Todo) => {
    await axiosInstance.put<Todo[]>(`todos/${data.id}`, data)
}

export const deleteTodo = async (id: number) => {
    await axiosInstance.delete<Todo[]>(`todos/${id}`);
}

