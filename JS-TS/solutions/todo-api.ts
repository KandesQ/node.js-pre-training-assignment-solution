import { InMemoryRepository } from './repository';
import { Todo, NewTodo } from './types';

export class TodoApi {
  private repo = new InMemoryRepository<Todo>();

  async getAll(): Promise<Todo[]> {
    await randomDelay()
    return this.repo.findAll()
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    const createdTodo: Todo = {
      id: this.repo.getMaxId() + 1,
      title: newTodo.title,
      description: newTodo.description,
      status: newTodo.status,
      createdAt: new Date()
    }

    await randomDelay()
    return this.repo.add(createdTodo)
  }

  async update(id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo> {
    await randomDelay()
    return this.repo.update(id, update)
  }

  async remove(id: number): Promise<void> {
    await randomDelay()
    this.repo.remove(id)
  }
}


/**
 * Creates a random delay from 300 ms to 600 ms
 *
 * @param {number} min - minimal delay in milliseconds
 * @param {number} max - maximum delay in milliseconds
 */
async function randomDelay(min: number = 300, max: number = 600) {
  const delay = Math.floor(Math.random() * (max - min + 1) + min)

  return new Promise(
      resolve => setTimeout(resolve, delay)
  )
}