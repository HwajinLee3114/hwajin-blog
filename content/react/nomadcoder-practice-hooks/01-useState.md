---
title: '[노마드 코더]  실전형 리액트 Hooks useState'
date: '2022-02-21 00:00:01'
author: 쟈몽
tags: react nomadcoder hooks
categories: react
---

# USESTATE

## 1.0 Introduction to useState

- Hooks는 리액트의 state machine에 연결하는 기본적인 방법
- Hooks가 생기기 전에는 class component를 사용했는데 이는 this와 같은 문장 규칙과 render와 같은 사용 방법을 고려해야 했다.

```js
import React, { useState } from 'react';
import './styles.css';

// arrow function
const App = () => {
  const [item, setItem] = useState(1);
  // const item = useState(1)[0];
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);
  /*
    상단에 두 코드는 같은 의미
    item만 사용하고 싶다면 const item = useState(1)[1];
   */

  return (
    <div className="App">
      <h1>Hello {item}</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={incrementItem}>increment</button>
      <button onClick={decrementItem}>decrement</button>
    </div>
  );
};

// hooks 이전에 class component
class AppUgly extends React.Component {
  state = {
    item: 1,
  };

  render() {
    const { item } = this.state;
    return (
      <div className="App">
        <h1>Hello {item}</h1>
        <h2>Start editing to see some magic happen!</h2>
        <button onClick={this.incrementItem}>increment</button>
        <button onClick={this.decrementItem}>decrement</button>
      </div>
    );
  }

  incrementItem = () => {
    this.setState((state) => {
      return {
        item: state.item + 1,
      };
    });
  };

  decrementItem = () => {
    this.setState((state) => {
      return {
        item: state.item - 1,
      };
    });
  };
}

export default App;
```

## 1.1 useInput

- useInput은 react component가 아닌 완전히 다른 function이다.  
  우리는 이런 이벤트를 분리된 파일, 다른 entity에 연결해서 처리할 수 있다.

```js
import React, { useState } from 'react';
import './styles.css';

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    console.log(event.target);
  };
  return { value, onChange };
};

// useInput return value -> name = value
const App = () => {
  const name = useInput('Mr.');
  return (
    <div className="App">
      <h1>Hello</h1>
      {/* <input placeholder="name" value={name.value} onChange={name.onChange} /> */}
      <input placeholder="name" {...name} />
      {/* 위에 두 코드 의미 같음. 근데 위에 코드는 너무 길어서 안에 있는 모든 것을 unpack 한 코드가 아래 버전 */}
    </div>
  );
};

export default App;
```

## 1.2 useInput part2

- 1.1에서 작성한 코드를 좀 더 보완
- initialValue를 사용하는 대신 유효성을 검증하는 기능을 포함 (validate function)

```js
import React, { useState } from 'react';
import './styles.css';

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    let willUpdate = true;
    if (typeof validator === 'function') {
      willUpdate = validator(value); // 유효성 검사
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};
// useInput return value -> name = value
const App = () => {
  // const maxLen = (value) => value.length <= 10;
  const maxLen = (value) => !value.includes('@');
  const name = useInput('Mr.', maxLen);
  return (
    <div className="App">
      <h1>Hello</h1>
      {/* <input placeholder="name" value={name.value} onChange={name.onChange} /> */}
      <input placeholder="name" {...name} />
      {/* 위에 두 코드 의미 같음. 근데 위에 코드는 너무 길어서 안에 있는 모든 것을 unpack 한 코드가 아래 버전 */}
    </div>
  );
};

export default App;
```

- maxLen 부분을 수정하여 검증할 유효성 조건을 변경할 수 있다.

## 1.3 useTabs

```js
import React, { useState } from 'react';
import './styles.css';

const content = [
  {
    tab: 'Section 1',
    content: "I'm the content of the Section 1",
  },
  {
    tab: 'Section 2',
    content: "I'm the content of the Section 2",
  },
];

const useTabs = (initialTab, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }

  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex,
  };
};

const App = () => {
  const { currentItem, changeItem } = useTabs(0, content);
  return (
    <div className="App">
      {content.map((section, index) => (
        <button onClick={() => changeItem(index)}>{section.tab}</button>
      ))}
      {currentItem.content}
    </div>
  );
};

export default App;
```
