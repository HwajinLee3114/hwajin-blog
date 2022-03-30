---
title: '[노마드 코더] 실전형 리액트 Hooks useEffect'
date: '2022-02-22 00:00:00'
author: 쟈몽
tags: react nomadcoder hooks
categories: react
---

# USEEFFECT

## 2.0 Introduction to useEffect

- componentWillUnmount, componentDidMount, componentWillUpdate와 비슷  
  이 모든 것이 같은 function. react hooks로 작업할 때 이 function이 중요하다.

- useEffect는 2개의 인자를 받는데 첫번째는 function으로서의 effect.
  <span style='background-color:#f7ddbe'>componentDidUpdate</span>와 기능이 비슷하다.

useEffect는 componentDidMount 역할을 해서 새로고침 시 sayHello()가 실행된다.  
그렇지만 componentDidUpdate 역할도 해서 클릭 시 sayHello() 실행

```js
useEffect(() => {
  sayHello();
});

useEffect(sayHello); // 위에 코드를 이렇게 변경 가능
```

- 두번째 인자는 dependency의 deps. 만약 deps가 있다면 effect는 (deps) 리스트에 있는 값일 때만 값이 변하도록 활성화 될 것이다.

useEffect()가 deps 리스트에 있는 값이 변할때만 실행되게 한다.  
<span style='background-color:#f7ddbe'>componentWillUpdate</span>와 기능이 비슷하다.

만약 component가 mount 됐을 때 실행시키고 그 이후 어떤 경우에도 실행시키고 싶지 않다면 두번째 인자에 [] 빈 dependency를 전달해 주면 된다.

- sayHello는 useEffect로부터 function이 리턴된다. = <span style='background-color:#f7ddbe'>componentWillUnmount</span>

```js
import React, { useEffect, useState } from 'react';
import './styles.css';

const App = () => {
  const [number, setNumber] = useState(0);
  const [aNumber, setAnumber] = useState(0);

  // component가 mount 되자마자 sayHello라는 function 실행
  const sayHello = () => console.log('hello');
  // useEffect(() => {
  //   sayHello();
  // });

  useEffect(sayHello, [number]); // 위에 코드를 이렇게 변경 가능
  // 두번째 인자에 빈배열을 만들고 여기에 값이 존재하면 그 값은 변할거고 그리고 나서 useEffect는 활성화 될 것
  // 우리는 이 예제에서 number가 변할때만 sayHello가 작동하도록 할 것. > [number]
  // 그리고 새로고침이 되면 component가 mount 되어 hello console을 볼 수 있다.
  // 위 코드에 [number]로 해 뒀기때문에 number 값이 변경될 때마다 console을 불러오는 걸 볼 수 있다. 이게 기본적인 dependency

  return (
    <div className="App">
      <div>Hi</div>
      <button onClick={() => setNumber(number + 1)}>{number}</button>
      <button onClick={() => setAnumber(aNumber + 1)}>{aNumber}</button>
    </div>
  );
};

export default App;
```

## 2.1 useTitle

- 문서의 제목을 업데이트 시켜주는 Hooks  
  보통 이걸 하기위해서 helmet을 사용하는데 우리는 functional hooks 방식으로 만들어보자

```js
import React, { useEffect, useState } from 'react';
import './styles.css';

const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);

  const updateTitle = () => {
    const htmlTitle = document.querySelector('title'); // <title> 태그
    htmlTitle.innerText = title;
  };
  useEffect(updateTitle, [title]);
  return setTitle;
};

const App = () => {
  const titleUpdater = useTitle('Loading...');
  // titleUpdater = setTitle() 와 같은 의미
  setTimeout(() => titleUpdater('Home'), 5000); // 5s
  return (
    <div className="App">
      <div>Hi</div>
    </div>
  );
};

export default App;
```

Q. titleUpdater는 함수가 아닌데 어떻게 ("Home") 값을 넣어주는가?  
A. titleUpdater라는 변수에 setTitle()의 리턴값을 줘서 App 내부 자신이 원하는 시점(위치)에서 titleUpdater("Home") 이런식으로 호출하면 사용할 수 있는 것

## 2.2 useClick

useClick을 보기 전에 reference를 알아보고 진행

- reference : 기본적으로 우리의 component의 어떤 부부을 선택할 수 있는 방법  
  = document.getElementById()와 같다.

### useRef

원래 useEffect 밖에서 focus()를 했는데 mount가 너무 빨리되어서 potato.current가 극초반에 존재하지 않아 오류(undefined) 발생.  
그래서 아래와 같이 useEffect 안에서 동작시키거나 setTimeout(() => potato.current?.focus(), 5000); 로 수정할 수 있다.

++ Optional Chaining(?.)

```js
import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

const App = () => {
  const potato = useRef();
  // setTimeout(() => console.log(potato.current), 5000);

  useEffect(() => {
    setTimeout(() => potato.current.focus(), 5000);
  });

  return (
    <div className="App">
      <div>Hi</div>
      <input ref={potato} placeholder="la" />
    </div>
  );
};

export default App;
```

### useClick

```js
import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

const useClick = (onClick) => {
  const element = useRef(); // reference 생성
  useEffect(() => {
    if (typeof onClick !== 'function') {
      return;
    }
    // componentDidMount, componentDidUpdate
    if (element.current) {
      // reference 안에 element.current가 있는지 확인
      // 조건 만족 시 Click 이벤트 부여
      element.current.addEventListener('click', onClick);
    }
    return () => {
      // componentWillUnMount
      // function을 return 할 경우 useEffect를 return 받은 그 함수는 componentWillUnMount일 경우에 호출
      // component가 mount 되지 않았을때 eventListener 배치되지 않게 하기 위함
      if (element.current) {
        element.current.removeEventListener('click', onClick);
      }
    };
  }, []); // no dependency. dependency가 존재할 경우(또는 []가 없는 default 상태) 이 함수는 componentDidMount일 경우에만 호출
  // return element;
  return typeof onClick !== 'function' ? element : undefined;
  /**
   * react 16.8v부터 Hook을 조건문, 반복문, 중첩함수 내에서 호출 불가능
   * 강의 내용(typeof로 막는 부분이 원래 useClick 바로 하단에 있었음)과 같은 결과를 얻으려면
   * useEffect 내에서 이벤트 바인딩을 막고, 최종적으로 undefined를 리턴해야한다.
   * 단순히 이벤트 바인딩만 막으려면 return element를 그대로 사용해도 괜찮다.
   */
};

const App = () => {
  const sayHello = () => console.log('say hello');
  const title = useClick(sayHello);
  return (
    <div className="App">
      <h1 ref={title}>Hi</h1>
    </div>
  );
};

export default App;
```

## 2.3 useConfirm & usePreventLeave

이번에 생성할 2가지 Hook은 useEffect와 useState를 사용하지 않기 때문에 사실상 Hook은 아니다.

### useConfirm

- 사용자가 버튼을 클릭하면 (이벤트 실행하기 전에) 메시지를 보여준다.

```js
import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

const useConfirm = (message = '', onConfirm, onCancel) => {
  if (!onConfirm && typeof onConfirm !== 'function') {
    return;
  }

  // onCancel은 필수적인게 아니라서 있든 없든 상관 없지만, 있다면 function이여야한다.
  if (onCancel && typeof onCancel !== 'function') {
    return;
  }

  const confirmAction = () => {
    // confirm function이 browser에 message를 가지고 있다면.
    // ok 클릭 시 confirm(message) 값이 true가 돼서 callback 호출
    if (window.confirm(message)) {
      onConfirm();
    } else {
      onCancel();
    }
  };
  return confirmAction;
};

const App = () => {
  const deleteWorld = () => console.log('deleting the world');
  const abort = () => console.log('Aborted');

  const confirmDelete = useConfirm('are you sure', deleteWorld, abort);
  return (
    <div className="App">
      <button onClick={confirmDelete}>Delete the world</button>
    </div>
  );
};

export default App;
```

### usePreventLeave

- 창을 닫을 때 "아직 저장하지 않았어!"라고 알려주는 것
- protect를 클릭할 경우 window가 beforeunload이기 때문에 창 닫을 때 "변경사항이 저장되지 않았습니다."라는 팝업이 뜨는 것
- 예를 들어 beforeunload는 window가 닫히기 전에 function이 실행되는 것을 허락한다.

```js
import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = ''; // beforeunload는 returnValue를 요구한다.
  };

  // api에 뭔가를 보냈고, 사람들이 닫지 않기를 바란다면. 이걸 보호 할 수 있게 활성화 시키는 것
  // 그런데 Api가 응답을 해서 괜찮은 상태라면 사람들이 닫는걸 신경쓰지 않아도 됌. 그때는 이 보호를 활성화 시키지 않아도 된다.
  const enablePrevent = () => window.addEventListener('beforeunload', listener); // event 가로채기
  const disablePrevent = () => window.removeEventListener('beforeunload', listener);

  return { enablePrevent, disablePrevent };
};

const App = () => {
  const { enablePrevent, disablePrevent } = usePreventLeave();
  return (
    <div className="App">
      <button onClick={enablePrevent}>protect</button>
      <button onClick={disablePrevent}>unprotect</button>
    </div>
  );
};

export default App;
```

## 2.4 useBeforeLeave

- 탭을 닫을 때(창을 벗어나고자 할 때) 실행되는 function
  마우스가 페이지를 떠났을 때 실행된다.

```js
import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

const useBeforeLeave = (onBefore) => {
  const handle = (event) => {
    // console.log(event.clientY);
    const { clientY } = event;
    // clientY 가 <= 0 일때는 위로 벗어났을 때. 아래로 벗어난거는 취급하지 않음
    if (clientY <= 0) {
      onBefore();
    }
  };

  useEffect(() => {
    if (typeof onBefore !== 'function') {
      return;
    }
    document.addEventListener('mouseleave', handle);
    return () => document.removeEventListener('mouseleave', handle);
  }, []);
};

const App = () => {
  const begForLife = () => console.log('pls dont leave');
  // useBeforeLeave는 return이 없으므로 아래와 같이 작성
  useBeforeLeave(begForLife);
  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
};

export default App;
```

## 2.5 useFadeIn & useNetwork

- mix Hook & animation

### useFadeIn

```js
import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

const useFadeIn = (duration = 1, delay = 0) => {
  const element = useRef();
  useEffect(() => {
    if (typeof duration !== 'number' || typeof delay !== 'number') {
      return;
    }

    if (element.current) {
      const { current } = element;
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      current.style.opacity = 1;
    }
  }, []);
  return { ref: element, style: { opacity: 0 } };
};

const App = () => {
  const fadeInH1 = useFadeIn(1, 2);
  const fadeP = useFadeIn(5, 10);
  return (
    <div className="App">
      {/* <h1 ref={el} style={{ opacity: 0 }}> */}
      <h1 {...fadeInH1}>Hello</h1> {/* 위 코드랑 같은 내용 */}
      <p {...fadeP}>lorem ipsum lalalala</p>
    </div>
  );
};

export default App;
```

### useNetwork

- navigator가 online 또는 offline이 되는 것을 막아준다.
- 콘솔 Network > Offline / Online을 변경하면서 확인할 수 있다.

```js
import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

const useNetwork = (onChange) => {
  // navigator.onLine : true / false. 웹사이트 온라인 여부
  const [status, setStatus] = useState(navigator.onLine);
  const handleChange = () => {
    if (typeof onChange === 'function') {
      onChange(navigator.onLine);
    }
    setStatus(navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener('online', handleChange);
    window.addEventListener('offline', handleChange);

    () => {
      window.addEventListener('online', handleChange);
      window.addEventListener('offline', handleChange);
    };
  }, []);
  return status;
};

const App = () => {
  const handleNetworkChange = (online) => {
    console.log(online ? 'we just went online' : 'we are offline');
  };
  const onLine = useNetwork(handleNetworkChange);
  return (
    <div className="App">
      <h1>{onLine ? 'Online' : 'Offline'}</h1>
    </div>
  );
};

export default App;
```

## 2.6 useScroll & useFullscreen

사용자가 스크롤해서 무언가를 지나칠 때 함수를 실행한다.

### useScroll

```js
import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

const useScroll = () => {
  const [state, setState] = useState({
    x: 0,
    y: 0,
  });
  const onScroll = () => {
    // console.log("y : ", window.scrollY, "x : ", window.scrollX);
    setState({ y: window.scrollY, x: window.scrollX });
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    () => window.removeEventListener('scroll', onScroll);
  }, []);
  return state;
};

const App = () => {
  const { y } = useScroll();
  return (
    <div className="App" style={{ height: '1000vh' }}>
      <h1 style={{ position: 'fixed', color: y > 100 ? 'red' : 'blue' }}>Hello</h1>
    </div>
  );
};

export default App;
```

### useFullscreen

```js
import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

const useFullscreen = () => {
  const element = useRef();
  const triggerFull = () => {
    if (element.current) {
      element.current.requestFullscreen();
    }
  };
  const exitFull = () => {
    const chkFullScreen = document.fullscreenElement;
    if (chkFullScreen !== null) {
      document.exitFullscreen();
    }
  };
  return { element, triggerFull, exitFull };
};
// full screen을 요청할 땐 element와 함께 requestFullScreen을 사용했는데
// full screen에서 빠져나올 땐 document를 통해서 빠져나온다.

const App = () => {
  const { element, triggerFull, exitFull } = useFullscreen();
  return (
    <div className="App" style={{ height: '1000vh' }}>
      <h1>Hello</h1>
      <div ref={element}>
        <img ref={element} src="https://i.ibb.co/R6RwNxx/grape.jpg" alt="grape" width="250" />
        <button onClick={exitFull}>exit fullscreen</button>
      </div>
      <button onClick={triggerFull}>make fullscreen</button>
    </div>
  );
};

export default App;
```

## 2.7 useNotification

- 알림. notification api 이용

https://developer.mozilla.org/ko/docs/Web/API/notification

[ Static properties ]

- Notification.permission : read only(읽기 전용)
  - denied(거부), granted(허가), default(모든 알람이 허용되지 않음. 상태의 선택을 알 수 없어서 browser는 value가 denied인 것처럼 행동)

[ Static Method ]

- RequestPermisson()

```js
import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

const useNotification = (title, options) => {
  // window가 아니면 브라우저에서 noticifation을 지원하지 않기 때문에 확인
  if (!('Notification' in window)) {
    return;
  }

  const fireNotif = () => {
    if (Notification.permission !== 'granted') {
      // 권한이 없으므로 권한 요청
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      new Notification(title, options);
    }
  };
  return fireNotif;
};

const App = () => {
  const triggerNotif = useNotification('can i steal your kimchi?', {
    body: "i love kimchi, don't you?",
  });
  return (
    <div className="App">
      <button onClick={triggerNotif}>Hello</button>
    </div>
  );
};

export default App;
```

## 2.8 useAxios

- add Dependency > axios
- App.js

```js
import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import useAxios from './useAxios';

const App = () => {
  const { loading, data, error, refetch } = useAxios({
    url: 'https://yts.mx/api/v2/list_movies.json',
  });
  console.log(`Loading: ${loading}\nError: ${error}\nData: ${JSON.stringify(data)}`);
  return (
    <div className="App">
      <h1>{data && data.status}</h1>
      <h2>{loading && 'Loading'}</h2>
      <button onClick={refetch}>Refetch</button>
    </div>
  );
};

export default App;
```

- useAxios.js

```js
import defaultAxios from 'axios';
import { useEffect, useState } from 'react';
// axios : http request 만드는 것

// axios 는 약간의 customization과 configuration을 허용한다.
// ex) 디폴트 url을 설정하거나 자동으로 헤더를 설정하는 것 같은걸 허용
// 그래서 우린 axios instance를 얻을 것이다. 만약 얻지 못하면 import한 axios 를 전달
// 우리는 패키지에서 axios를 얻어서 전달할거다.
// axios는 내가 instance를 만드는걸 허용하고 나는 configuration을 할 수 있고 그것과 함께 헤더를 보낼 수 있다.
const useAxios = (opts, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });

  const [trigger, setTrigger] = useState(0);

  const refetch = () => {
    setState({
      ...state,
      loading: true,
    });
    setTrigger(Date.now()); // random number
  };

  useEffect(() => {
    if (!opts.url) {
      // opts : options
      return;
    }

    axiosInstance(opts)
      .then((data) => {
        setState({
          ...state,
          loading: false,
          data,
        });
      })
      .catch((error) => {
        // error catch
        setState({ ...state, loading: false, error });
      });
  }, [trigger]);
  return { ...state, refetch };
};

export default useAxios;
```

<!-- ## 2.9 Conclusions

## 2.10 publishing to NPM

## 2.11 What to learn next -->
