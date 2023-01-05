import { CloseOutlined } from "@ant-design/icons"
import { DatePicker } from "antd"
import TodoStore from "../../store/TodoStore"
import { cn } from "../../utils/cn"
import styles from "./TodoItem.module.css"
import dayjs from "dayjs"
import { useEffect, useState } from "react"

export const TodoItem = ({ id, todo, passed, order, dateTo }) => {

    const [status, setStatus] = useState("empty")

    const getTaskStatus = () => {
        console.log(1)
        const currentDate = new Date().valueOf();
        const finishDate = new Date(dateTo).valueOf();
        console.log(currentDate, finishDate)
        if (currentDate >= finishDate) {
            setStatus("overdue")
            return;
        }
        setStatus("in progress")
    }

    useEffect(() => {
        getTaskStatus()
        const intervalId = setInterval(getTaskStatus, 2000)

        return (() => {
            clearInterval(intervalId)
        })
    }, [])

    return (
        <li
            key={id}
            className={styles.todoItem}>
            <div className={styles.statusBar}>
                <p>
                    Status: <span className={cn(styles.status, status === "overdue" && styles.overdue)}>{status}</span>
                </p>
                <div className={styles.date}>
                    <p>date to:</p>
                    <DatePicker
                        showTime={true}
                        defaultValue={dayjs(dateTo)}
                        onChange={(date) => { TodoStore.setDateToFromTodo(id, date) }} />
                </div>
            </div>
            <p
                className={passed ? styles.passed : {}}
                onClick={() => { TodoStore.passTodo(id) }}>{`${order}. ${todo}`}</p>
            <div className={styles.closeIcon} onClick={() => { TodoStore.deleteTodo(id) }}><CloseOutlined /></div>
        </li>
    )
}