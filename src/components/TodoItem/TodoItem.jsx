import { CloseOutlined } from "@ant-design/icons"
import { DatePicker } from "antd"
import TodoStore from "../../store/TodoStore"
import { cn } from "../../utils/cn"
import styles from "./TodoItem.module.css"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { Reorder } from "framer-motion"

export const TodoItem = (todoValue) => {
    const { id, todo, passed, order, dateTo, item } = todoValue;
    const [status, setStatus] = useState("empty")

    const getTaskStatus = () => {
        const currentDate = new Date().valueOf();
        const finishDate = new Date(dateTo).valueOf();
        if (currentDate >= finishDate) {
            setStatus("overdue")
            return;
        }
        setStatus("in progress")
    }

    const animateVariants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
        },
        exit: {
            opacity: 0,
        }
    }

    useEffect(() => {
        getTaskStatus()
        const intervalId = setInterval(getTaskStatus, 2000)

        return (() => {
            clearInterval(intervalId)
        })
    }, [])

    return (
        <Reorder.Item
            whileDrag={{
                scale: 1.01,
            }}
            value={item}
            key={id}
            className={styles.todoItem}
            {...animateVariants}>
            <div className={styles.statusBar}>
                <p>
                    Status: <span className={cn(styles.status, status === "overdue" && styles.overdue)}>{status}</span>
                </p>
                <div className={styles.date}>
                    <p>date to:</p>
                    <DatePicker
                        showTime={true}
                        defaultValue={dayjs(dateTo)}
                        onChange={(date) => { console.log(date); TodoStore.setDateToFromTodo(id, date) }} />
                </div>
            </div>
            <p
                className={passed ? styles.passed : {}}
                onClick={() => { TodoStore.passTodo(id) }}>{`${order}. ${todo}`}</p>
            <div className={styles.closeIcon} onClick={() => { TodoStore.deleteTodo(id) }}><CloseOutlined /></div>
        </Reorder.Item>
    )
}