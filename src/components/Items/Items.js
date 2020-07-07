import React, {useState} from 'react';
import styles from './Items.module.scss'
import Button from "@material-ui/core/Button";
import Item from "./Item/Item";


const Items = ({items, setNewItemName, addItem, newItemName, removeItem, toggleItem}) => {

    const [isEmpty, setIsEmpty] = useState(false)

    const onChangeInput = (e) => {
        setNewItemName(e.currentTarget.value)
        if (e.currentTarget.value !== '' && isEmpty) {
            setIsEmpty(false)
        }
    }

    const addNewItem = () => {
        if (newItemName === '') {
            setIsEmpty(true)
        } else {
            addItem()
        }
    }

    const addNewItemWithKeyboard = (e) => {
        if (e.ctrlKey) {
            if (newItemName === '') {
                setIsEmpty(true)
            } else {
                addItem()
            }
        }
    }

    return (
        <div className={styles.items}>
            <h2>Items</h2>
            <div className={styles['items__input-group']}>
                <input
                    type="text"
                    placeholder='Type name here'
                    onChange={onChangeInput}
                    className={`${isEmpty && styles.error}`}
                    value={newItemName}
                    onKeyPress={addNewItemWithKeyboard}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={addNewItem}
                >

                    Add new
                </Button>
            </div>
            <div className={styles.items__list}>
                {items.map(item =>
                    <Item
                        {...item}
                        key={item.id}
                        removeItem={removeItem}
                        toggleItem={toggleItem}
                    />)}
            </div>
        </div>
    )
}
export default Items