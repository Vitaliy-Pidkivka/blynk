import React, {useState} from 'react';
import styles from './Comments.module.scss'
import Button from "@material-ui/core/Button";
import Comment from "./Comment/Comment";


const Comments = ({comments, addComment, removeComment, itemId, changeComment}) => {

    const [newCommentName, setNewCommentName] = useState('');
    const [newCommentBackground, setNewCommentBackground] = useState('#000000');
    const [isEmpty, setIsEmpty] = useState(false)

    const onChangeInput = (e) => {
        setNewCommentName(e.currentTarget.value)
        if (e.currentTarget.value !== '' && isEmpty) {
            setIsEmpty(false)
        }
    }
    const onChangeColorInput = (e) => {
        setNewCommentBackground(e.currentTarget.value)
    }

    const addNewComment = () => {
        if (newCommentName === '') {
            setIsEmpty(true)
        } else {
            let commentId = 0;
            let id = comments.map(comment => {
                if (comment.id > commentId) {
                    commentId = commentId + 1
                    return null
                }
            })
            addComment(itemId, commentId + 1, newCommentName, newCommentBackground)
            setNewCommentBackground('#000')
            setNewCommentName('')
        }
    }

    const addNewItemWithKeyboard = (e) => {
        if (e.ctrlKey) {
            if (newCommentName === '') {
                setIsEmpty(true)
            } else {
                addComment()
            }
        }
    }

    return (
        <div className={styles.comments}>
            <h2>Comments #{itemId + 1}</h2>
            <div className={styles.comments__list}>
                {comments.map(comment => (
                    <Comment
                        {...comment}
                        key={comment.id}
                        removeComment={removeComment}
                        itemId={itemId}
                        changeComment={changeComment}
                    />
                ))}
            </div>
            <div className={styles['comments__input-group']}>
                <input
                    type="color"
                    onChange={onChangeColorInput}
                    value={newCommentBackground}
                />
                <textarea
                    placeholder='Type comment here'
                    onChange={onChangeInput}
                    className={`${isEmpty && styles.error}`}
                    value={newCommentName}
                    onKeyPress={addNewItemWithKeyboard}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={addNewComment}
                >
                    Add new
                </Button>
            </div>
        </div>
    )
}
export default Comments