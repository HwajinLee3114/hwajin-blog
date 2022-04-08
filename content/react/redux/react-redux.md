---
title: '[React-Redux] React-Redux'
date: '2022-04-02 00:00:00'
author: 쟈몽
tags: react redux react-redux
categories: react
---

# React-Redux 패키지와 Hooks 사용

## React-Redux 패키지 설치

```shell
npm install react-redux
```

## Provider 컴포넌트 사용

(내용 추가 필요)

React-Redux에서 제공하는 Provider 컴포넌트를 리액트의 최상위 컴포넌트로 정의한다.

> index.js

```js
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
```

> /redux/index.js

```js
import { combineReducers } from 'redux';
import comments from './comments';

const rootReducer = combineReducers({ comments });

export default rootReducer;
```

### useSelector

state 값만 인수로 받는다. &rarr; Store의 상태에 접근해서 데이터를 가져온다.  
리덕스의 Store를 subscribe하고 액션이 dispatch 될 떄마다 selector를 실행한다.
그리고 useSelector()는 기본적으로 형변환 비교(==)가 아닌 엄격한 비교(===)를 사용한다.

```js
import React from 'react';
import { useSelector } from 'react-redux';

export const TodoListItem = (props) => {
  const todo = useSelector((state) => state.todos[props.id]);
  return <div>{todo.text}</div>;
};
```

### useDispatch

컴포넌트 내에서 dispatch를 사용할 수 있게 해준다. 이 dispatch를 이용해 action을 발생시킨다.

```js
import React from 'react';
import { useDispatch } from 'react-redux';

export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <span>{value}</span>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment counter</button>
    </div>
  );
};
```

```js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Component() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: Action });
  }, [dispatch]);

  const value = useSelector((state) => state.value);

  return <div>{value}</div>;
}
```

> [참고](https://ko.redux.js.org/)
