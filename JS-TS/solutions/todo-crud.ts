import { Todo } from './types';

export function addTodo(state: Todo[], newTodo: Todo): Todo[] {
  return [...state, newTodo]
}

export function updateTodo(state: Todo[], id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Todo[] {
  const updatedState: Todo[] = []

  for (const todo of state) {
    updatedState.push(
        todo.id === id
          ? {...todo, ...update}
          : todo
    )
  }

  if (!updatedState.some(todo => todo.id === id)) {
    throw new Error(`Id=[${id}] was not found in todos`)
  }

  return updatedState
}

export function removeTodo(state: Todo[], id: number): Todo[] {
  const todoExists = state.some(todo => todo.id === id)
  if (!todoExists) {
      throw new Error(`Id=[${id}] was not found in todos`)
  }

  return state.filter(todo => todo.id !== id)
}

export function getTodo(state: Todo[], id: number): Todo | undefined {
  return state.find(todo => todo.id === id)
}
