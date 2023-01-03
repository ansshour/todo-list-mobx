import { observer } from "mobx-react-lite"
import styles from "./Todo.module.css"
import { TodoList } from "../../components/TodoList/TodoList"

export const Todo = observer(() => {

    return (
        <>
            <TodoList />
        </>

    )
})