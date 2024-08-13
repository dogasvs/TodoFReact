import { useState, useEffect } from 'react'
import './App.css'

let id = 0;

const generateid = () => ++id;

function App() {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  function appendTodo(todo) {
    const TodoObj = {
      id: generateid(),
      todo
    }
    setTodos([...todos, TodoObj]);
  }

  function CompleteTodo(id) {
    const completedTodos = [...todos];
    const todo = completedTodos.find(x => x.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
    setTodos(completedTodos);
  }

  function deleteTodo(id) {
    setTodos(todos.filter(x => x.id !== id));
  }

  return (
    <div className="container">
      <Header theme={theme} setTheme={setTheme} />
      <TodoForm appendTodo={appendTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} CompleteTodo={CompleteTodo}/>
    </div>
  )
}

function Header({theme, setTheme}) {
  return (
  <div className="header">
      <h1>TODO</h1>
      <button className='darkMode' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        <img src="/img/darkmode.svg" alt="moon image" />
      </button> 
      <button className='lightMode' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        <img src="img/gunes.svg" alt="light mode" />
      </button>
    </div>
  )
}

function TodoList({todos, deleteTodo, CompleteTodo}) {

  return (
    <div className='todoList'>
      {todos.map(x => <TodoItem key={x.id} id={x.id} todo={x.todo} completed={x.completed} deleteTodo={deleteTodo} CompleteTodo={CompleteTodo} />)}
    </div>
  )
}

function TodoItem({todo, id, deleteTodo, CompleteTodo, completed}) {

  return (
    <div className='todoItem'>
      <div className="todoResult">
        <label>
          <input type="checkbox" key="checkbox" onChange={() => CompleteTodo(id)}  />
          <div className="custom-checkbox"></div>
        </label>
          <span className={completed ? 'completed' : ''}>{todo}</span>
      </div>
      <div className="deletebtn">
        <button onClick={() => deleteTodo(id)}> <img src="img/deletebtn.svg" alt="delete" /> </button>
      </div>
    </div>
  )
}

function TodoForm({appendTodo}) {

  function handleSubmitForm(e) {
    e.preventDefault();
    appendTodo(e.target['todo'].value);
    e.target.reset();
  }

  return (
    <form className="TodoForm" autoComplete='off' onSubmit={handleSubmitForm}>
      <input name='todo' required type="text" placeholder="Create a new todo…" />
      <img className='oval' src="/img/Oval.svg" alt="oval light mode" />
      <img className='ovalDark' src="/img/OvalDark.svg" alt="oval dark mode" />
    </form>
  )
}
 
export default App
