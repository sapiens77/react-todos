import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

// TodoListItem에서 방금 만든 onRemove함수를 사용하려면 우선 TodoList 컨포넌트를 거처야 한다. 다음과 같은 props로 받아 온 onRemove 함수를 TodoListItem에 그대로 전달하자.
const TodoList = ({ todos, onRemove, onToggle }) => {
    return (
        <div className="TodoList">
            {todos.map(todo => (
                <TodoListItem
                    todo={todo}
                    key={todo.id}
                    onRemove={onRemove}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
};

export default TodoList;
