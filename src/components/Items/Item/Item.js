import React from 'react';
import styles from './Item.module.scss'
import Button from "@material-ui/core/Button";


const Item = ({name, comments, isActive, removeItem, id,toggleItem}) => {

    const deleteItem = () => {
        removeItem(id)
    }
    const activateItem=()=>{
        toggleItem(id)
    }

    return <div className={`${styles.item} ${isActive && styles.isActive}`}
                onClick={activateItem}
    >
        <span className={styles.item__name}>
            {name}
        </span>
         <div>
                <span className={styles.item__counter}>
                    {comments.length}
                </span>
            <Button variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={deleteItem}
            >
                Remove
            </Button>
         </div>
    </div>

}
export default Item