export class InMemoryRepository<T extends { id: number }> {
  // private storage
  private items: T[] = [];

  add(entity: T): T {
    const entityClone = structuredClone(entity)
    this.items = [...this.items, entityClone]

    return entityClone
  }

  update(id: number, patch: Partial<T>): T {
    let updatedItem: T

    this.items = this.items.map(
        item => {
          if (item.id === id) {
            updatedItem = {...item, ...patch}
            return updatedItem
          }
          return item
        }
    )

    if (!updatedItem) {
      throw new TodoNotFoundError(`Todo with id=[${id}] was not found`)
    }

    return updatedItem
  }

  remove(id: number): void {
    const newItems = this.items.filter(item => item.id !== id)

    if (newItems.length === this.items.length) {
      throw new TodoNotFoundError(`Todo with id=[${id}] was not found`)
    }

    this.items = newItems
  }

  findById(id: number): T | undefined {
    return structuredClone(
        this.items.find(item => item.id === id)
    )
  }

  findAll(): T[] {
    return this.items.map(
        item => structuredClone(item)
    )
  }

  getMaxId(): number {
    return this.items.reduce(
        (acc, item) => Math.max(acc, item.id),
        0
    )
  }
}

class TodoNotFoundError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = "TodoNotFoundError"

    Object.setPrototypeOf(this, TodoNotFoundError.prototype)
  }
}