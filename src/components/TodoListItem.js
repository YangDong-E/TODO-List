import React from 'react'
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'
import { FaRegTrashAlt } from 'react-icons/fa'
import cn from 'classnames'
import './TodoListItem.scss'

const TodoListItem = ({ todo, onRemove, onToggle, style }) => {
    const { id, text, checked } = todo

    return (
        <div className="TodoListItem-virtualized" style={style}>
            <div className="TodoListItem">
                <div
                    className={cn('checkbox', { checked })}
                    onClick={() => onToggle(id)}
                >
                    {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                    <div className="text">{text}</div>
                </div>
                <div className="remove" onClick={() => onRemove(id)}>
                    <FaRegTrashAlt />
                </div>
            </div>
        </div>
    )
}

export default React.memo(TodoListItem)
