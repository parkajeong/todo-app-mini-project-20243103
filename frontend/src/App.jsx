import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const API_BASE_URL = 'http://localhost:5000'

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchTodos = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await axios.get(`${API_BASE_URL}/api/todos`)
      setTodos(response.data)
    } catch (err) {
      setError('목록을 불러오지 못했습니다.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (e) => {
    e.preventDefault()

    if (!title.trim()) return

    try {
      setError('')
      const response = await axios.post(`${API_BASE_URL}/api/todos`, {
        title: title.trim(),
        dueDate: dueDate || null,
      })

      setTodos((prev) => [...prev, response.data])
      setTitle('')
      setDueDate('')
    } catch (err) {
      setError('할 일 추가에 실패했습니다.')
      console.error(err)
    }
  }

  const toggleTodo = async (id, completed) => {
    try {
      setError('')
      const response = await axios.put(`${API_BASE_URL}/api/todos/${id}`, {
        completed: !completed,
      })

      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? response.data : todo)),
      )
    } catch (err) {
      setError('할 일 상태 변경에 실패했습니다.')
      console.error(err)
    }
  }

  const deleteTodo = async (id) => {
    try {
      setError('')
      await axios.delete(`${API_BASE_URL}/api/todos/${id}`)
      setTodos((prev) => prev.filter((todo) => todo._id !== id))
    } catch (err) {
      setError('할 일 삭제에 실패했습니다.')
      console.error(err)
    }
  }

  const formatDueDate = (dateString) => {
    if (!dateString) return '지정없음'

    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return '지정없음'

    return date.toLocaleDateString('ko-KR')
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className="app">
      <div className="todo-container">
        <div className="hero-box">
          <h1>todo - list</h1>
          <p>할 일을 정리하세요</p>
        </div>

        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            className="todo-input"
            placeholder="할 일을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="date"
            className="date-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <button type="submit" className="add-btn">
            추가
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {loading ? (
          <p className="status-text">불러오는 중...</p>
        ) : todos.length === 0 ? (
          <p className="status-text">등록된 할 일이 없습니다.</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo._id} className="todo-item">
                <div className="todo-left">
                  <label className="circle-check">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo._id, todo.completed)}
                    />
                    <span className="checkmark"></span>
                  </label>

                  <div className="todo-text-group">
                    <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
                      {todo.title}
                    </span>
                    <span className="todo-date">
                      마감기한: {formatDueDate(todo.dueDate)}
                    </span>
                  </div>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo._id)}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App