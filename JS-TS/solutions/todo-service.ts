import {TodoApi} from './todo-api';
import {NewTodo, Todo, TodoStatus} from './types';

export class TodoService {
  constructor(private readonly api: TodoApi) { }

  async create(title: string, description = ''): Promise<Todo> {
    const newTodo: NewTodo = {
      title: title,
      description: description,
      status: TodoStatus.PENDING
    }

    return await this.api.add(newTodo)
  }

  async toggleStatus(id: number): Promise<Todo> {
    const update = { status: TodoStatus.COMPLETED }

    return await this.api.update(id, update)
  }

  async search(keyword: string): Promise<Todo[]> {
    keyword = keyword.toLowerCase()

    return (await this.api.getAll()).filter(
        todo => todo.title.toLowerCase().includes(keyword) ||
            todo.description.toLowerCase().includes(keyword)
    )
  }

  async getAllTodos(): Promise<Todo[]> {
    return await this.api.getAll()
  }
}
