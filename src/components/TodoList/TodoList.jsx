import { observer } from "mobx-react-lite"
import styles from "./TodoList.module.css"
import TodoStore from "../../store/TodoStore"
import Input from "antd/es/input/Input"
import { Button } from "antd"
import { cn } from "../../utils/cn"
import { CloseOutlined } from "@ant-design/icons"
import { SwitchTodoList } from "../SwitchTodoList/SwitchTodoList"
import { useState } from "react"
import { TodoItem } from "../TodoItem/TodoItem"
import { AnimatePresence, Reorder } from "framer-motion"
import { toJS } from "mobx"

export const TodoList = observer(() => {

    const [isCanRenameTodoList, setIsCanRenameTodoList] = useState(false)

    const addTodoSubmit = (e) => {
        e.preventDefault()
        TodoStore.addTodo()
    }

    return (
        <div className={styles.todo}>
            <SwitchTodoList />
            {TodoStore.activeListName && (
                <>
                    <div className={styles.top}>
                        <div className={styles.name}>
                            <Input
                                onChange={e => { TodoStore.renameTodoList(e.target.value) }}
                                value={TodoStore.activeListName}
                                disabled={!isCanRenameTodoList} />
                            <Button onClick={() => { setIsCanRenameTodoList(!isCanRenameTodoList) }}>Rename todo list</Button>
                        </div>
                        <Button onClick={() => { TodoStore.deleteTodoList() }}>Delete todo list</Button>
                    </div>
                    <form
                        className={styles.addTodoWrapper}
                        onSubmit={e => addTodoSubmit(e)}>
                        <Input
                            placeholder="Write task"
                            value={TodoStore.todoInput}
                            onChange={event => TodoStore.setTodoInput(event.target.value)} />
                        <div className={styles.buttonWrapper}>
                            <Button>Add</Button>
                        </div>
                    </form>
                    <Reorder.Group className={styles.todos} axis="y" values={TodoStore.todos[TodoStore.activeListName]} onReorder={value => TodoStore.setTodo(value)}>
                        <AnimatePresence initial={false}>
                            {!TodoStore.todos[TodoStore.activeListName].length && <p>TodoList is empty!</p>}
                            {TodoStore.todos[TodoStore.activeListName].map((item, i) => {
                                const { id, todo, passed, dateTo } = item;
                                return (
                                    <TodoItem
                                        item={item}
                                        dateTo={dateTo}
                                        key={id}
                                        order={i + 1}
                                        id={id}
                                        todo={todo}
                                        passed={passed} />
                                )
                            })}
                        </AnimatePresence>
                    </Reorder.Group>
                </>
            )}
        </div >
    )
})