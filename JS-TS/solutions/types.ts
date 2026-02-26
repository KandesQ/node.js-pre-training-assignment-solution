interface Todo {
    id: number
    title: string
    description: string
    status: TodoStatus
    readonly createdAt: Date
}

enum TodoStatus {
    COMPLETED = 0,
    PENDING = 1,
    IN_PROGRESS = 2
}

export type NewTodo = Omit<Todo, "id" | "createdAt">

export { Todo, TodoStatus };