---
title: '[노마드 코더]  실전형 리액트 Hooks 시작하기'
date: '2022-02-20 00:00:00'
author: 쟈몽
tags: react nomadcoder hooks
categories: react
---

[실전형 리액트 Hooks](https://nomadcoders.co/react-hooks-introduction)

(추후 내용 정리 예정)

리액트 공부를 시작하면서 여러 강의를 찾아보다가 노마드 코더를 알게되었다.  
그중 [실전형 리액트 Hooks 10개]를 수강하며 알게된 것들을 정리해 보기로 했다.

# #0 INTRODUCTION

https://www.npmjs.com/  
이 사이트는 사람들이 각자 만든 Hook을 공유할 수 있는 사이트다.

이 강의에서는 자주 사용되는 hooks에 대해 배우고 생성한 hooks를 npm에 등록할 수 있도록 해본다.

## Requirements

- React에 대한 이해
- React와 node.js 설치

## Workflow

- hook을 생성하며 바로바로 적용되는 것을 확인하기 위해 codesandbox를 사용하여 작업

### CodeSandbox 생성하기

'Create Sandbox' 클릭 후 Templates로 React를 선택한다.

### React Hooks

[리액트 Hooks 참고 영상](https://www.youtube.com/watch?v=yS-BU6eYUDE)

functional component 에서 state를 가질 수 있게 해준다.
ex) 앱을 리액트 훅으로 만든다면, class component, did mount, render ... 등을 안해도 된다는 뜻

- 모든 것이 하나의 function이 되는 것
- 이제 functional programming (함수형 프로그래밍) 스타일이 된다는 뜻

Hook의 역사는 recompose에서 시작되었다.
recompose + react = react Hooks  
Hooks -> const [num, setNum] = useState(0);  
기존에는 class component를 이용했었다.

### Effect Hook

https://www.youtube.com/watch?v=yS-BU6eYUDE

Effect Hook 이란 것도 있는데 이건 component, did mount, did update와 비슷하다.  
주로 api에서 데이터를 요청할 때 사용
