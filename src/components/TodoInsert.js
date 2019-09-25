import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

/** 항목 추가 기능 구현하기
 *
 *  이번에는 [일정-항목을-추가하는-기능]을 구현해 보겠다. 이 기능을 구현하려면, TodoInsert 컴포넌트에서 [인풋-상태]를 관리하고 App 컴포넌트에는
 *  [todo배열]에 새로운 객체를 추가하는 함수를 만들어 주어야 한다.
 *
 *  <TodoInsert value 상태 관리하기>
 *  TodoInsert 컴포넌트에서 인풋에 입력하는 값을 관리할 수 있도록 useState를 사용하여 value라는 상태를 정의하고, 추가로 인풋에 넣어 줄 onChange 함수도
 *  작성해 주어야 한다. 이 과정에서 컴포넌트가 리렌더링될 때마다 함수를 새로 만드는 것이 아니라, 한번 함수를 만들고 재사용할 수 있도록
 *  useCallback Hook을 사용해보자
 *
 *  인풋은 value값과 onChagne를 설정하지 않더라도 입력할 수 있다. 그저 리액트 컴포넌트 쪽에서 해당 인풋에 무엇이 입력되어 있는지 추적하지 않을 뿐이다.
 *  이런 경우 현재 state가 잘 업데이트되고 있는지 확인하려면, onChage함수 안에서 console.log를 찍어 보는것 외에 어떤 방법을 있을까?
 *  바로 [리액트-개발자-도구](React Developer Tools)를 사용하는 방법이 있다.
 *
 *  [리액트개발자도구]는 브라우저에 나타난 리액트 컴포넌트를 심층 분석할 수 있도록 리액트 개발팀이 만들었으며, 크롬 웹 스토어에서
 *  React Developer Tools를 검색하여 설치할 수 있다.
 */

const TodoInsert = ({ onInsert }) => {
    const [value, setValue] = useState('');

    const onChange = useCallback(e => {
        // console.log('== 체크 ==' + e.target.value);
        setValue(e.target.value);
    }, []); //빈 배열을 넣어 처음 렌더링 할때만 호출 - useCallback Hook 참고

    /** onSubmit이라는 함수를 만들고, 이를 form의 onSubmit으로 설정했다. 이 함수가 호출되면 props로 받아 온 onInsert함수에
     *  [현재-value값을-파라미터로-넣어서-호출]하고, 현재 value값을 초기화 한다.
     *  추가로 onSubmit 이벤트는 브라우저를 새로고침시킨다. 이때 e.preventDefault()함수를 호출하면 새로고침을 방지할 수 있다.
     *
     *  물론 [onClick-이벤트]로도 기능 구현이 가능하다. 근데 굳이 form과 onSubmit 이벤틀르 사용한 이유는 무엇일까? onSubmit 이벤트의 경우
     *  인풋에서 [엔터]를 눌렀을 때도 발생하기 때문이다. 반면 버튼에서 onClick만 사용했다면, 인풋에서 [onKeyPress]이벤트를 통해 [엔터]를 감지하는
     *  로직을 따로 작성해야 한다. 그렇기 때문에 이번에는 onClick이 아닌 onSubmit으로 새 항목을 추가하도록 처리했다.
     */

    const onSubmit = useCallback(
        e => {
            onInsert(value);
            setValue(''); // value 값 초기화

            // submit 이벤트는 브라우저를 새로고침을 발생시키므로, 이름 방지하기 위해 이 함수를 호출한다.
            e.preventDefault();
        },
        [onInsert, value],
    );

    return (
        <div>
            <form className="TodoInsert" onSubmit={onSubmit}>
                <input
                    placeholder="할 일을 입력하세요"
                    value={value}
                    onChange={onChange}
                />
                <button type="submit">
                    <MdAdd />
                </button>
            </form>
        </div>
    );
};

export default TodoInsert;
