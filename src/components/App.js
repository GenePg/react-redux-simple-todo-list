import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

import { connect } from 'react-redux'
import { getTodo } from '../actions/index'

const getTodoData = async (dispatch) => {
  const res = await fetch('/api/todos');
  const data =  await res.json();
  dispatch(getTodo(data))
}

const App = ({dispatch}) => {
  getTodoData(dispatch);
  return(
    <div>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
  )
}

export default connect()(App)
