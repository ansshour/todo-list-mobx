import { autorun, makeAutoObservable } from "mobx";

class TodoStore {
    constructor(options) {
        console.log(options)
        this.todoInput = options.todoInput;
        this.newTodoName = options.newTodoName;
        this.todos = options.todos;
        makeAutoObservable(this)
        autorun(() => {
            localStorage.setItem("todos", JSON.stringify(this.todos))
        })
    }

    todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : {}

    activeListName = Object.keys(this.todos)?.length ? Object.keys(this.todos)[0] : null

    setActiveList(name) {
        this.activeListName = name;
    }

    setTodoInput(value) {
        this.todoInput = value;
    }

    setNewTodoName(value) {
        this.newTodoName = value;
    }

    addNewTodoList() {
        const inUniqueName = !(this.newTodoName in this.todos)
        if (inUniqueName) {
            this.todos = { ...this.todos, [this.newTodoName]: [] }
            this.activeListName = this.newTodoName
            this.newTodoName = ""
        }
    }

    deleteTodoList() {
        const tempName = this.activeListName;
        const keysTodos = Object.keys(this.todos)
        const afterName = (() => {
            const index = keysTodos.findIndex(name => name === tempName);
            if (index - 1 >= 0) {
                return keysTodos[index - 1]
            }
            return null
        })()
        this.activeListName = afterName;
        delete this.todos[tempName]
    }

    renameTodoList(newName) {
        const tempTodos = JSON.parse(JSON.stringify(this.todos))
        const activeListNameTemp = this.activeListName;
        const itemsActiveTodo = tempTodos[activeListNameTemp]
        if (newName) {
            this.activeListName = newName;
            delete this.todos[activeListNameTemp]
            this.todos = { ...this.todos, [newName]: [...itemsActiveTodo] }
        }
    }

    addTodo() {
        const isUnique = (() => {
            let isUnique = true;
            this.todos[this.activeListName].forEach(({ todo }) => {
                if (todo === this.todoInput) {
                    isUnique = false;
                }
            })
            return isUnique;
        })()
        if (isUnique) {
            this.todos[this.activeListName].push({ id: Math.random(), todo: this.todoInput, passed: false })
            this.todoInput = ""
        }
    }

    passTodo(id) {
        this.todos = {
            ...this.todos,
            [this.activeListName]: this.todos[this.activeListName].map(item => {
                if (item.id === id) {
                    return ({ ...item, passed: true })
                }
                return item
            })
        }
    }

    deleteTodo(id) {
        this.todos = {
            ...this.todos,
            [this.activeListName]: this.todos[this.activeListName].filter(item => item.id !== id)
        }
    }

    getTodoListsToSelectFormat() {
        const todos = this.todos;
        return Object.keys(todos).map(item => ({ value: item, label: item }))
    }
}

export default new TodoStore({ todoInput: "", newTodoName: "", todos: JSON.parse(localStorage.getItem("todos") || "{}") });