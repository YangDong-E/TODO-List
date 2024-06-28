// 컴포넌트 최적화 방법(useReducer 사용)
import React, { useReducer, useRef, useCallback, useEffect } from 'react'
import TodoTemplate from './components/TodoTemplate'
import TodoInsert from './components/TodoInsert'
import TodoList from './components/TodoList'

function todoReducer(todos, action) {
    switch (action.type) {
        case 'INSERT': // 새로 추가
            // { type: 'INSERT', todo: { id: 1, text: 'todo', checked: false } }
            return todos.concat(action.todo)
        case 'REMOVE': // 제거
            // { type: 'REMOVE', id: 1 }
            return todos.filter((todo) => todo.id !== action.id)
        case 'TOGGLE': // 토글
            // { type: 'REMOVE', id: 1 }
            return todos.map((todo) =>
                todo.id === action.id
                    ? { ...todo, checked: !todo.checked }
                    : todo
            )
        default:
            return todos
    }
}

const App = () => {
    // 초기값으로 storeTodos를 가져옴
    const [todos, dispatch] = useReducer(todoReducer, undefined, storeTodos)

    // 새로고침을 하더라도 리스트내용이 사라지지 않게 로직 구현
    // todos가 업데이트 될때 로컬스토리지에 저장
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    // 로컬스토리지에서 todos를 가져옴
    function storeTodos() {
        const todos = localStorage.getItem('todos')
        return todos ? JSON.parse(todos) : []
    }

    // 고유 값으로 사용 될 id
    // ref 를 사용하여 변수 담기
    const nextId = useRef(1)

    const onInsert = useCallback((text) => {
        const todo = {
            id: nextId.current,
            text,
            checked: false,
        }
        dispatch({ type: 'INSERT', todo })
        nextId.current += 1
    }, [])

    const onRemove = useCallback((id) => {
        dispatch({ type: 'REMOVE', id })
    }, [])

    const onToggle = useCallback((id) => {
        dispatch({ type: 'TOGGLE', id })
    }, [])

    return (
        <TodoTemplate>
            <TodoInsert onInsert={onInsert} />
            <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
        </TodoTemplate>
    )
}

export default App

// 컴포넌트 최적화 방법 (useState의 함수형 업데이트 기능)

// import React, { useRef, useState, useCallback } from 'react'
// import TodoTemplate from './components/TodoTemplate'
// import TodoInsert from './components/TodoInsert'
// import TodoList from './components/TodoList'

// function createBulkTodos() {
//     const array = []
//     for (let i = 1; i <= 2500; i++) {
//         array.push({
//             id: i,
//             text: `할 일 ${i}`,
//             checked: false,
//         })
//     }
//     return array
// }

// const App = () => {
//     const [todos, setTodos] = useState(createBulkTodos)

//     // 고유 값으로 사용 될 id
//     // ref 를 사용하여 변수 담기
//     const nextId = useRef(4)

//     const onInsert = useCallback((text) => {
//         const todo = {
//             id: nextId.current,
//             text,
//             checked: false,
//         }
//         setTodos((todos) => todos.concat(todo))
//         nextId.current += 1 // nextId 1 씩 더하기
//     }, [])

//     const onRemove = useCallback((id) => {
//         setTodos((todos) => todos.filter((todo) => todo.id !== id))
//     }, [])

//     const onToggle = useCallback((id) => {
//         setTodos((todos) =>
//             todos.map((todo) =>
//                 todo.id === id ? { ...todo, checked: !todo.checked } : todo
//             )
//         )
//     }, [])

//     return (
//         <TodoTemplate>
//             <TodoInsert onInsert={onInsert} />
//             <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
//         </TodoTemplate>
//     )
// }

// export default App
