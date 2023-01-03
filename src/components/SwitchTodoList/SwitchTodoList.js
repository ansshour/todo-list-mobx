import { Button, Input, Select } from "antd"
import { observer } from "mobx-react-lite"
import TodoStore from "../../store/TodoStore"
import styles from "./SwitchTodoList.module.css"

export const SwitchTodoList = observer(() => {

    const addNewTodoList = (e) => {
        e.preventDefault()
        TodoStore.addNewTodoList()
    }

    const getDefaultValue = () => {
        const options = TodoStore.getTodoListsToSelectFormat();
        if (options.length) {
            return options[0]
        }
        return ""
    }

    const selectChangeHandler = (item) => {
        TodoStore.setActiveList(item)
    }

    return (
        <div className={styles.switchTodoList}>
            <div className={styles.switch}>
                <p className={styles.choose}>Choose List</p>
                <Select
                    value={TodoStore.activeListName ? TodoStore.activeListName : null}
                    defaultValue={getDefaultValue}
                    style={{ width: 500 }}
                    onChange={(item) => { selectChangeHandler(item) }}
                    options={[...TodoStore.getTodoListsToSelectFormat()]}
                />
            </div>
            <form
                className={styles.addNewTodoList}
                onSubmit={(e) => { addNewTodoList(e) }}>
                <p className={styles.newTodo}>Add new todo</p>
                <Input
                    placeholder="Write todo name"
                    value={TodoStore.newTodoName}
                    onChange={e => TodoStore.setNewTodoName(e.target.value)} />
                <div className={styles.buttonWrapper}>
                    <Button>Add</Button>
                </div>
            </form>
        </div>
    )
})