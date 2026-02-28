import {TodoService} from "../JS-TS/solutions/todo-service";
import {TodoApi} from "../JS-TS/solutions/todo-api";
import {TodoNotFoundError} from "../JS-TS/solutions/repository";
import {Todo, TodoStatus} from "../JS-TS/solutions/types";


jest.useFakeTimers()

test(
    "successful creation of a todo",
    async () => {
        const todoApi = new TodoApi()
        const todoService = new TodoService(todoApi)

        // Arrange
        const title = "title"
        const description = "description"

        // Act
        const createdTodoPromise: Promise<Todo> = todoService.create(title, description)
        jest.runAllTimers()
        const createdTodo = await createdTodoPromise

        // Assert
        expect(createdTodo.id).toBe(1)
        expect(createdTodo.title).toBe(title)
        expect(createdTodo.description).toBe(description)
        expect(createdTodo.status).toBe(TodoStatus.PENDING)
        expect(createdTodo.createdAt).toBeDefined()
    }
)

test(
    "Status successfully toggled",
    async () => {
        const todoApi = new TodoApi()
        const todoService = new TodoService(todoApi)

        // Arrange
        const title = "title"
        const description = "description"
        const createdTodoPromise: Promise<Todo> = todoService.create(title, description)
        jest.runAllTimers()
        const createdTodo: Todo = await createdTodoPromise


        // Act
        const toggledTodoPromise: Promise<Todo> = todoService.toggleStatus(createdTodo.id)
        jest.runAllTimers()
        const toggledTodo: Todo = await toggledTodoPromise

        // Assert
        expect(toggledTodo.id).toBe(createdTodo.id)
        expect(toggledTodo.title).toBe(createdTodo.title)
        expect(toggledTodo.description).toBe(createdTodo.description)

        expect(toggledTodo.status).toBe(TodoStatus.COMPLETED)
    }
)

test(
    "toggling status should throw error if provided id was not found",
    async () => {
        const todoApi = new TodoApi()
        const todoService = new TodoService(todoApi)

        // Arrange
        const nonexistentId = -2

        // Act + assert
        await expect(
            async () => {
                const promise: Promise<Todo> = todoService.toggleStatus(nonexistentId)
                jest.runAllTimers()
                await promise
            }
        ).rejects.toThrow(TodoNotFoundError)
    }
)


test(
    "search should return array of found todos",
    async () => {
        const todoApi = new TodoApi()
        const todoService = new TodoService(todoApi)

        // Arrange
        const promise1 = todoService.create("Todo 1 keyword", "desc 1")
        const promise2 = todoService.create("Todo 2", "desc 2 keyword")
        const promise3 = todoService.create("Todo 3", "desc 3")
        jest.runAllTimers()
        await Promise.all([promise1, promise2, promise3])

        // Act
        const foundTodosPromise: Promise<Todo[]> = todoService.search("keyword")
        jest.runAllTimers()
        const foundTodos = await foundTodosPromise

        // Assert
        expect(foundTodos).toHaveLength(2)
    }
)

test(
    "search should return empty array",
    async () => {
        const todoApi = new TodoApi()
        const todoService = new TodoService(todoApi)

        // Act
        const foundTodosPromise: Promise<Todo[]> = todoService.search("nothing")
        jest.runAllTimers()
        const foundTodos: Todo[] = await foundTodosPromise

        // Assert
        expect(foundTodos).toHaveLength(0)
    }
)