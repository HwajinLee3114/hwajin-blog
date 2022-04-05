---
title: '[React-Redux] Redux'
date: '2022-04-01 00:00:00'
author: 쟈몽
tags: react redux
categories: react
---

# Redux 란?

리덕스는 간단하게 말해서 **자바스크립트를 위한 상태 관리 프레임워크**이다.

- Action이라 불리는 이벤트를 통해 프로젝트의 상태를 관리하고 업데이트하는 패턴 및 라이브러리
- 상태를 예측할 수 있는 방법으로만 업데이트를 할 수 있도록 규칙을 정해 전체에서 사용하는 **_중앙 집중식 상태 저장소_**

## 📚 Redux를 사용하는 이유

&rarr; Redux로 상태를 관리하기 위해서

나의 경우에는 React 프로젝트를 진행하며 각 컴포넌트 간에 값을 props로 전달을 하고 있던 중 하위에 전달해야하는 컴포넌트 deps가 증가하게 되면서 Redux를 접하게되었다.

리덕스를 사용할 경우 Store라는 외부에 값이 저장되어 상태가 관리되기 때문에 프로젝트의 많은 부분에서 사용되는 전역 상태를 관리하는데 도움이 된다.

## Redux 사용 장점

## Redux 주요 개념

- 단방향 데이터 흐름
- Action이 Dispatcher를 통해 Store에 전달되는 흐름

### Action

`type`, `payload` 속성으로 구성되고 상태값은 오직 해당 객체에 의해서만 변경되어야 한다.  
`type` 속성은 필수적으로 가져야 하고, 액션 생성시 필요한 추가 데이터인 `payload` 속성은 선택적으로 넣을 수 있다.

```js
{
    type : 'INSERT',
    payload : {
        id : 0,
        text : 'insert 데이터입니다.'
    }
}
```

### Action Creators (액션 생성함수)

파라미터를 받아와 액션 형태로 만들어주는 함수이다.  
함수 앞에 `export`를 붙여주면 다른 파일에서 사용 가능하다.

```js
export function addMemo(data) {
  return {
    type: 'ADD_MEMO',
    data,
  };
}
```

다음과 같이 화살표 함수로도 생성이 가능하다.

```js
export const addMemo = (data) => ({
  type: 'ADD_MEMO',
  data,
});
```

### Reducer

`state`와 `action` 객체를 파라미터로 받아와 새로운 상태값으로 생성하는 함수를 의미한다.  
기존에 존재하는 `state`를 변경할 수는 없기 때문에, 기존 값을 복사하여 복사된 값을 변경한다.  
리듀서는 `useReducer`를 사용할 때 작성하는 리듀서와 같은 형태를 가지고 있다.

```js
const initialState = { value: 0 };

function counter(state = initialState, action = { type: '' }) {
  if (action.type === 'INCREMENT') {
    return {
      ...state,
      value: state.value + 1,
    };
  }

  if (action.type === 'DECREMENT') {
    return {
      ...state,
      value: state.value - 1,
    };
  }

  return state;
}
```

다음과 같이 초기값을 주지 않고도 생성이 가능하다.

```js
function counter(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
```

리덕스를 사용할 때 여러개의 Reducer를 생성하고, 이를 Root Reducer로 합칠 수 있다.

### Store

<span style="color:lightgray">내용 정리 필요</span>

리덕스의 상태값을 가지는 객체로, 액션의 발생은 Store의 dispatch 메서드로 시작된다.

Reducer를 전달해 하나의 프로젝트 당 하나의 스토어가 생성되고, 스토어에는 현재 프로젝트 상태와 리듀서 및 기타 내장 함수들이 존재한다.  
또한 `getState` 메서드를 이용해 상태에 접근하고, dispatch(action)을 통해 상태를 수정할 수 있다.

### Dispatch

Store의 내장 함수 중 하나로, 스토어의 액션 핸들러가 올바른 순서로 실행되도록 관리한다.

파라미터로는 액션을 전달 받는다.

```js
const increment = () => {
  return {
    type: 'counter/increment',
  };
};

store.dispatch(increment());
console.log(store.getState()); // {value : 2}
```

```js
store.dispatch({ type: 'counter/increment' });
console.log(store.getState());
```

### Subscribe

Store의 내장 함수 중 하나로, 액션이 dispatch 됐을 때마다 전달해준 함수가 호출된다.

파라미터로는 함수 형태의 값을 받는다.

리액트에서는 이 함수를 직접 사용하기 보다는, React-Redux 라이브러리에서 제공하는 `connect` 함수 또는 `useSelector` Hook을 사용해 스토어 상태에 구독한다.
