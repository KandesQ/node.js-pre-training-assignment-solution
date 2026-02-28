import { TodoService } from './todo-service';
import { TodoApi } from './todo-api';
import { Todo } from './types';

export class ToDoManager {
  private service = new TodoService(new TodoApi());

  async init(): Promise<void> {
    await this.service.create("todo 1", "desc 1")
    await this.service.create("todo 2", "desc 2")
    await this.service.create("todo 3", "desc 3")
    await this.service.create("todo 4", "desc 4")
  }

  async add(title: string, description = ''): Promise<void> {
    await this.service.create(title, description)
  }

  async complete(id: number): Promise<void> {
    await this.service.toggleStatus(id)
  }

  async list(): Promise<Todo[]> {
    return await this.service.getAllTodos()
  }
}
