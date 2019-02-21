import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

const postTodoData = async (dispatch, input) => {
  const res = await fetch('/api/todos', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({text: input.value})
  })
  const data = await res.json()
  dispatch(addTodo(data.text))
}

const AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        postTodoData(dispatch, input)
        input.value = ''
      }}>
        <input ref={node => input = node} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default connect()(AddTodo)
