import React from 'react'
import { MdAdd } from 'react-icons/md'
import './TodoInsert.scss'

const TodoInsert = () => {
    return (
        <form className="TodoInsert">
            <input placeholder="메모를 입력해주세요." />
            <button type="submit">
                <MdAdd />
            </button>
        </form>
    )
}

export default TodoInsert
