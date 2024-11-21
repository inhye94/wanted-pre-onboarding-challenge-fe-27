import { TodoType } from "../pages/todos/components/todoList/TodoList";
import { axiosRequest } from "./axios/request";

interface TodoPayloadType {
  title: string;
  content: string;
}

export const getTodos = async () => {
  return await axiosRequest.get<TodoType[]>("/todos");
};

export const getTodoById = async (todoId: string) => {
  return await axiosRequest.get<TodoType>(`/todos/${todoId}`);
};

export const createTodo = async (payload: TodoPayloadType) => {
  return await axiosRequest.post<TodoPayloadType, TodoType>("/todos", payload);
};

export const updateTodo = async (todoId: string, payload: TodoPayloadType) => {
  return await axiosRequest.update<TodoPayloadType, TodoType>(
    `/todos/${todoId}`,
    payload
  );
};

export const deleteTodo = async (todoId: string) => {
  return await axiosRequest.delete(`/todos/${todoId}`);
};
