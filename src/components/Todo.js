import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateTodo, deleteTodo } from '../actions/index'

const Todo = ({ dispatch, id, onClick, completed, text }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [todoText, setTodoText] = useState(text);

  const onClickDeleteTodo = async() => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        dispatch(deleteTodo(id))
      }
    } catch(err) {
      console.log('err', err)
    }
  }

  const onClickUpdateTodo = async () => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: todoText }) // body
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(updateTodo(data))
        setIsEditable(!isEditable)
      }
    } catch(err) {
      console.log('err', err)
    }
  }

  const renderNotEditable = () => {
    const spanText = (
      <span
        onClick={onClick}
        style={{
          textDecoration: completed ? 'line-through' : 'none'
        }}
      >
        {todoText}
      </span>
    )
    const buttonEdit = <button onClick={() => setIsEditable(!isEditable)}>edit</button>;
    return (
      <React.Fragment>
        {spanText}
        {buttonEdit}
      </React.Fragment>
    )
  }

  const renderEditable = () => {
    const inputField = (
      <input
        value={todoText}
        onChange={e => setTodoText(e.target.value) }
      />
    )
    const buttonUpdate = <button onClick={() => onClickUpdateTodo()}>update</button>;

    return (
      <React.Fragment>
        {inputField}
        {buttonUpdate}
      </React.Fragment>
    )
  }

  const handleRenderIsEditable = () => isEditable ? renderEditable() : renderNotEditable();
  
  return (
    <li>
      { handleRenderIsEditable() }
      <button
        onClick={() => onClickDeleteTodo()}
      >X</button>
    </li>
  )
}

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default connect()(Todo);
