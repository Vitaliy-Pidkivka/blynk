import React from 'react';
import './App.css';
import Sidebar from "./components/Sidebar/Sidebar";
import Items from "./components/Items/Items";
import {connect} from "react-redux";
import {
    addComment,
    addItem,
    changeComment,
    removeComment,
    removeItem,
    setNewItemName,
    toggleItem
} from "./redux/appReducer";
import Comments from "./components/Comments/Comments";

const App = ({items, setNewItemName, addItem, newItemName,removeItem,
    toggleItem,addComment, removeComment, changeComment}) => {
    return (
        <div className="App">
            <Sidebar/>
            <div className="content">
                <Items items={items}
                       setNewItemName={setNewItemName}
                       addItem={addItem}
                       newItemName={newItemName}
                       removeItem={removeItem}
                       toggleItem={toggleItem}
                />
                {items.map(item => {
                    if(item.isActive){
                        return  <Comments comments={item.comments}
                                          itemId={item.id}
                                          addComment={addComment}
                                          key={item.id}
                                          removeComment={removeComment}
                                          changeComment={changeComment}
                        />
                    }
                })}
            </div>

        </div>
    );
}

const mapStateToProps = (state) => ({
    items: state.app.items,
    newItemName: state.app.newItemName,
})
export default connect(mapStateToProps, {setNewItemName, addItem, removeItem,
    toggleItem, addComment, removeComment, changeComment})(App);
