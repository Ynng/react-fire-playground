import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class TodoItem extends Component {
  getStyle = () => {
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: this.props.todo.completed ? 'line-through' : 'none',
    }
  }

  render() {
    const {id, completed, title} = this.props.todo;

    return (
      <div style={this.getStyle()}>
        <p>
          <input type="checkbox" checked={completed} onChange={this.props.markComplete.bind(this, id)}/>
          {' '} {title}
          <button style = {btnStyle} onClick={this.props.delTodo.bind(this, id)}>X</button>
        </p>
      </div>
    )
  }
}

// PropTypes
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired
}

const btnStyle = {
  background: "#f00",
  color: '#fff', 
  border: 'none', 
  padding: '5px 10px', 
  borderRadius: '50%',
  float: 'right',
  cursor: 'pointer',
  display: "inline-block"
}

export default TodoItem
