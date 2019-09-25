import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
    const array = [];
    for (let i = 1; i <= 2500; i++) {
        array.push({
            id: i,
            text: `할 일 ${i}`,
            checked: false,
        });
    }
    return array;
}
// 데이터를 하나하나 직접 입력할 수는 없으므로 createBulkTodos라는 함수를 만들어서 데이터 2,500개를 자동으로 생성한다.

const App = () => {
    /*
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: '리액트의 기초 알아보기',
            checked: true,
        },
        {
            id: 2,
            text: '컴포넌트 스타일링 보기',
            checked: true,
        },
        {
            id: 3,
            text: '일정 관리 앱 만들어 보기',
            checked: false,
        },
    ]);
*/
    // 여기서 주의할 점은 useState의 기본값에 함수를 넣어 주었다는 것. 여기서 useState(createBulkTodos())라고 작성하면
    // 리렌더링 될때마다 createBulkTodos 함수가 호출되지만, useState(createBulkTodos)처럼 파라미터를 함수 형태로 넣어주면
    // 컴포넌트가 처음 렌더링될 때만 createBulkTodos 함수가 실행 될 것이다.
    const [todos, setTodos] = useState(createBulkTodos);

    // 고유값으로 사용될 id, ref를 사용하여 변수 담기
    const nextId = useRef(4);

    const onInsert = useCallback(
        text => {
            const todo = {
                id: nextId.current,
                text,
                checked: false,
            };
            setTodos(todos.concat(todo));
            nextId.current += 1; //nextId 1씩 더하기
        },
        [todos],
    );

    // filter함수를 사용하여 onRemove함수를 작성해보자. App 컴포넌트에 id를 파라미터로 받아 와서 같은 id를 가진 항목을 todos 배열에서 지우는 함수다.
    // 이 함수를 만들고 TodoList의 props로 설정해주면된다.
    const onRemove = useCallback(
        id => {
            setTodos(todos.filter(todo => todo.id !== id));
        },
        [todos],
    );

    const onToggle = useCallback(id => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, checked: !todo.checked } : todo,
            ),
        );
    });
    /**위 코드에서는 배열 내장 함수 map을 사용하여 특정 id를 가지고 있는 객체의 checked 값을 반전시켜 주었다.
     * 불변성을 유지하면서 특정 배열 원소를 업데이트해야 할 때 이렇게 map을 사용하면 짧은 코드로 쉽게 작성할 수 있다.
     *
     * 자, [여기서-갑자기-왜-map이-사용된-것인지-이해하기-힘들-수도-있다.]
     * map함수는 배열을 전체적으로 [새로운-형태]로 [변환]하여 [새로운-배열을-생성]해야할 때
     * 사용한다고 배웠다. 지금 딱 하나의 원소만 수정하는데 왜 map을 사용할까?
     *
     * onToggle 함수를 보면 todo.id === id ? ... : ... 이라는 삼항 연산자가 사용되었다. 여기서 사용한 코드에 대해 좀 더 자세히 알아보자
     * todo.id와 현재 파라미터로 사용된 id 값이 값을 때는 우리가 정해 준 규칙대로 새로운 객체를 생성하지만, id값이 다를 때는 변화를 주지 않고
     * 처름 받아 왔던 상태 그대로 반환한다. 그렇기 때문에 map을 사용하여 만든 배열에서 변화가 필요한 원소만 원데이트 되고 나머지는 그대로 남아
     * 있게 되는 것이다.
     */
    return (
        <TodoTemplate>
            <TodoInsert onInsert={onInsert} />
            <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
        </TodoTemplate>
    );
};

export default App;

/** 지우기 기능 구현하기
 *
 *  리액트 컴포넌트에서 [배열의-불변성]을 지키면서 배열 원소를 제거해야 할 경우, 배열 내장 함수인 filter를 사용하면 매우 간편하다.
 *  1. 배열 내장 함수 filter
 *  filter 함수는 기존의 배열을 그대로 둔 상태에서 특정 조건을 만족하는 원소들만 따로 추출하여 새로운 배열을 만들어 준다.
 *  filter 함수에는 조건을 확인해 주는 함수를 파라미터로 따로 넣어주어야 한다. 파라미터로 넣은 함수는 true or false값을 반환해야 하며,
 *  true를 반환하는 경우만 새로운 배열에 포함된다.
 */

/** 수정 기능
 *
 *  수정 기능도 삭제 기능과 꽤 비슷하다. onToggle이라는 함수를 App에 만들고, 해당 함수를 TodoList 컴포넌트에게 props로 넣어준다. 그 다음에
 *  TodoList를 통해 TodoListItem까지 전달해 주면된다.
 */
