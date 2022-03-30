---
title: MarkDown 문법
date: '2022-03-26 00:00:00'
author: 쟈몽
tags: markdown
categories: etc
---

블로그 포스팅을 하면서 마크다운 문법을 사용하는데  
문법 공부할 겸 항상 여러 사이트에 찾아보기 번거로워서 정리를 해보기로 했다.

## 줄바꿈

스페이스바 2번 + Enter

## 중첩된 구조

중첩된 구조를 표현할 때 스페이스바를 2번씩 추가를 하면 된다.

```jsx
- 첫번째
  - 두번째 (스페이스바 2번)
    - 세번째 (스페이스바 4번)
```

- 첫번째
  - 두번째 (스페이스바 2번)
    - 세번째 (스페이스바 4번)

## Header

```jsx
# h1
## h2
### h3
#### h4
##### h5
###### h6
```

# h1

## h2

### h3

#### h4

##### h5

###### h6

> h1과 h2는 아래와 같이 표현할 수도 있다.

```jsx
h1
==
h2
--
```

## 텍스트

### 강조

```jsx
**강조된 텍스트**
```

**강조된 텍스트**

<!-- #### 기울임

```jsx
*기울어진 텍스트*
***굵고 기울어진 텍스트***
```

*기울어진 텍스트*
***굵고 기울어진 텍스트*** -->

### 취소선

```jsx
~~취소된 텍스트~~
```

~~취소된 텍스트~~

### 밑줄

```jsx
<u>밑줄 있는 텍스트</u>
```

<u>밑줄 있는 텍스트</u>

### 글자 색

```jsx
<span style="color:skyblue">하늘색 글씨</span>
```

<span style="color:skyblue">하늘색 글씨</span>

## 코드 블록

### inline 코드 블록

```jsx
이것은 `인라인 코드` 입니다
```

이것은 `인라인 코드` 입니다

### 코드 블록

````text
```언어 이름(소문자)
이 부분에 코드 적기
```
````

```js
function testFunction() {
  console.log('testfunction');
}
```

## 링크

### 링크만 있는 inline 링크

```js
<링크주소>
<https://hwajin-blog.netlify.app/>
```

https://hwajin-blog.netlify.app/

### 설명 있는 inline 링크

```js
[링크설명](링크주소)
[나의 개발 블로그](https://hwajin-blog.netlify.app/)
```

[나의 개발 블로그](https://hwajin-blog.netlify.app/)

### 동일 파일 내에서의 문단(헤더) 이동 링크

```js
[설명어](문단의 주소)
```

[설명 있는 inline 링크](<http://localhost:8000/etc/markdown/#:~:text=blog.netlify.app/-,%EC%84%A4%EB%AA%85%20%EC%9E%88%EB%8A%94%20inline%20%EB%A7%81%ED%81%AC,-%5B%EB%A7%81%ED%81%AC%EC%84%A4%EB%AA%85%5D(%EB%A7%81%ED%81%AC%EC%A3%BC%EC%86%8C)%0A%5B%EB%82%98%EC%9D%98>)

> 문단(헤더) 링크 복사

1. 헤더 제목 문자열을 복사해서 `(문단의 주소)`에 복사한다.
2. 특수 문자를 제거한다.
3. 공백을 `-`로 변경한다.
4. 대문자는 소문자로 변경한다. ex) "#Test! 여기" > "#test-여기"

## 인용문

`>`로 표현할 수 있다. `>>` 두개 쓰면 중첩된 인용문을 표현. 중첩시킬 땐 앞에 스페이스바 2번

```js
> 이건 인용문이에요.
  >> 이건 중첩된 인용문이에요.
```

> 이건 인용문이에요.
>
> > 이건 중첩된 인용문이에요.

## 테이블

`|`와 `-`(3개 이상)의 조합으로 테이블 생성 가능

### 정렬

왼쪽 정렬 |:—|  
오른쪽 정렬 |—:|  
가운데 정렬 |:—:|

```jsx
|**제목**|레이팅|감상평|
|:---:|---:|---|
|복수는 나의 것|⭐⭐⭐⭐⭐|내가|
|올드 보이|⭐⭐⭐⭐⭐|좋아하는|
|친절한 금자씨|⭐⭐⭐⭐⭐|박찬욱 영화!|
```

|    **제목**    |     레이팅 | 감상평       |
| :------------: | ---------: | ------------ |
| 복수는 나의 것 | ⭐⭐⭐⭐⭐ | 내가         |
|   올드 보이    | ⭐⭐⭐⭐⭐ | 좋아하는     |
| 친절한 금자씨  | ⭐⭐⭐⭐⭐ | 박찬욱 영화! |

## 토글 리스트(접기/펼치기)

```jsx
<details>
  <summary>토글 메뉴에요</summary>
  <div markdown="1">😎숨겨진 내용😎</div>
</details>
```

<details>
<summary>토글 메뉴에요</summary>
<div markdown="1">

😎숨겨진 내용😎

</div>
</details>

## 버튼

```jsx
<a href="#" class="btn--success">
  Success Button
</a>
```

<a href="#" class="btn--success">Success Button</a>

## 형광펜

```jsx
<span style="background-color:#fff5b1">노랑</span>
<span style="background-color:#f6f8fa">회색</span>
<span style="background-color:#f1f8ff">파랑</span>
<span style="background-color:#ffdce0">빨강</span>
<span style="background-color:#dcffe4">초록</span>
<span style="background-color:#f5f0ff">보라</span>
<span style="background-color:#f7ddbe">주황</span>
```

<span style='background-color:#fff5b1'>노랑</span>  
<span style='background-color:#f6f8fa'>회색</span>  
<span style='background-color:#f1f8ff'>파랑</span>  
<span style='background-color:#ffdce0'>빨강</span>  
<span style='background-color:#dcffe4'>초록</span>  
<span style='background-color:#f5f0ff'>보라</span>  
<span style='background-color:#f7ddbe'>주황</span>
