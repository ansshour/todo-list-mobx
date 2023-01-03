import { observer } from "mobx-react-lite"
import styles from "./TodoList.module.css"
import TodoStore from "../../store/TodoStore"
import Input from "antd/es/input/Input"
import { Button } from "antd"
import { cn } from "../../utils/cn"
import { CloseOutlined } from "@ant-design/icons"
import { SwitchTodoList } from "../SwitchTodoList/SwitchTodoList"

export const TodoList = observer(() => {

    const addTodoSubmit = (e) => {
        e.preventDefault()
        TodoStore.addTodo()
    }

    return (
        <div className={styles.todo}>
            <SwitchTodoList />
            {TodoStore.activeListName && (
                <>
                    <p className={styles.todoName}>{TodoStore.activeListName}</p>
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
                    <ul className={styles.todos}>
                        {!TodoStore.todos[TodoStore.activeListName].length && <p>TodoList is empty!</p>}
                        {TodoStore.todos[TodoStore.activeListName].map(({ id, todo, passed }, i) => (
                            <li
                                key={id}
                                className={cn(styles.todoItem, passed && styles.passed)}
                                onClick={() => { TodoStore.passTodo(id) }}>
                                <p>{`${i + 1}. ${todo}`}</p>
                                <div className={styles.closeIcon} onClick={() => { TodoStore.deleteTodo(id) }}><CloseOutlined /></div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div >
    )
})