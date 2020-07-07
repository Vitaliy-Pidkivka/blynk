import React, {useState} from 'react';
import styles from './Comment.module.scss'

const Comment = ({background, name, itemId, id, removeComment, changeComment}) => {

    const [isEditName, setIsEditName] = useState(false);

    const deleteComment = (e) => {
        if (e.ctrlKey) {
            removeComment(itemId, id)
        }
    }

    const changeCommentName = () => {
        setIsEditName(true)
    }
    const deactivateChangeComment = () => {
        setIsEditName(false)
    }

    const setCommentName = (e) => {
        if (e.key === 'Enter') {
            changeComment(itemId, id, e.currentTarget.value)
            setIsEditName(false)
        }
    }

    return (
        <div
            className={styles.comment}
            onClick={deleteComment}
        >
            <div
                className={styles['comment__color-square']}
                style={{backgroundColor: background}}
            >
                <span className='sr-only'>Empty tag</span>
            </div>
            <div
                className={styles.comment__name}
                onDoubleClick={changeCommentName}
            >
                {isEditName && <input
                    type="text"
                    placeholder={name}
                    autoFocus={true}
                    onKeyPress={setCommentName}
                    onBlur={deactivateChangeComment}
                />}
                {!isEditName && name}
            </div>
        </div>
    )
}
export default Comment