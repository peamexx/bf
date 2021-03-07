![bf logo img](https://user-images.githubusercontent.com/38338103/109740606-e2b79300-7c0e-11eb-9bc1-ff047410d28e.jpg)

> Javascript를 활용한 스마트폰 정보 사이트.
 
 
![bf pc version img](https://user-images.githubusercontent.com/38338103/109740659-f82cbd00-7c0e-11eb-99bc-9786bcafad92.jpg)

![bf mobile version im](https://user-images.githubusercontent.com/38338103/110229922-3ba96300-7f50-11eb-9a98-9c91fb71599b.jpg)


[미리보기](https://peamexx.github.io/bf/)

*블로그 [peamexx.tistory.com](http://peamexx.tistory.com)*

*이메일 peamexx@daum.net*

✨✨✨
[전체 포트폴리오 보기](https://peamexx.github.io/me/)
✨✨✨

___

### 특징 🧚🏻‍♀️
- 반응형
- 웹 접근성 고려
___

### 사용 기술 🤸🤸‍♂️
- Javascript
- HTML / SCSS
___

### 메뉴 👩🏻‍💻
1. 메인

___

### 페이지 별 사용 기능 🔥
| 메인  | 사용 기능 |
| ------------- |:-------------:|
| header      | 1. 빈칸     |
| main      | 1. 슬라이드<br /> 2. 새로운 소식을 확인하세요<br /> 3. 내게 어떤 폰이 맞을까?<br /> 4.내게 딱 맞는 요금제를 추천해드려요     |
| footer      | 1. 빈칸 |

___

### 상세 내용 🔥🔥

- **접근성**
    - H2 tag: 스크린리더기가 읽을 수 있는 화면 탐색용 텍스트 숨김 처리.
    - button: 디자인 타입일 경우 type="button" 별도 명시.
    - color css: 저시력 및 색각 이상 이용자를 위해 해시코드 대신 rgb 활용.
    - input, label: input의 id와 label의 for를 같은 값으로 지정하여 label(텍스트)클릭 시 input선택될 수 있도록 처리.

- **슬라이드**
    - left를 조절하여 3가지 배너 롤링.
    - *(첫번째 페이지 ---> 롤링되지 않음)*
    - *(마지막 페이지 ---> 첫페이지로 돌아감)*
    - 배너가 바뀔 때마다 background-color 동시에 변경.
    - window.addEventListener('resize')를 통해 슬라이드 자체 반응형 처리.
~~~
 function sliderResize() {
    let imgHeight = slideAll[0].querySelector('img').offsetHeight;
    windowWidth = window.innerWidth;

    if(windowWidth < 1200) {
        slideAll.forEach((item) => item.style.width = windowWidth + 'px');
        visual.style.height = imgHeight + 'px';
    }
};
~~~

   - window.addEventListener('load')를 통해 페이지 접속 시 슬라이드 height 수동 처리.
~~~
 function setVisualHeight() {
    // 처음 화면 접속 시 화면을 움직이지 않는 이상 resize가 되지 않아 height를 못잡음
    let visualWidth = visual.offsetWidth;

    if(windowWidth < 1200) {
        slideAll.forEach((item) => item.style.width = visualWidth + 'px'); // visual width만큼 img width 수동 변경
        let imgHeight = slideAll[0].querySelector('img').offsetHeight; // width가 변경되면서 바뀐 height 기록
        visual.style.height = imgHeight + 'px';
    }
};
~~~

- **새로운 소식을 확인하세요** 
    - 공지사항, 이벤트 옆 more(+)부분 가상선택자 활용.
    - 내용 텍스트 줄 수에 따라 생략(...) 표시.

- **내게 어떤 폰이 맞을까?**
    - 4개의 선택지 테스트로 3가지 결과값 출력.
```
    // 데이터 형태
    let questionsObj = [
    {
        title: '자고로 스마트폰이란...',
        choice1: {
            text: '편하게 국내 스마트폰이 좋아',
            score: {
                galaxy: 3,
                iphone: 0,
                other: 0
            }
        },
        choice2: {
            text: '유니크하게 해외 스마트폰이 좋아',
            score: {
                galaxy: 0,
                iphone: 2,
                other: 1
            }
        }
    },
    ...]
```

```
    // '다음'버튼 클릭 시 다음번 질문제목, 선택지 데이터 노출
    let keys = [];
    for(let key in questionsObj[0]) {
        keys.push(key); // ["title(질문제목)", "choice1(선택지1)", "choice2(선택지2)"]
    };

    for(let i=1; i<keys.length; i++) {
        questionBtnAll.forEach((item) => {
            item.textContent = questionsObj[indexCount - 1][keys[i]].text;
            keys.splice(keys[i], 1);
        });
    };
```

```
    // 키 값에 해당하는 array 생성 ["galaxy", "iphone", "other"]
    let keys = []; 
    for(let key in answer[0]) {
        keys.push(key);
    };

    // value에 해당하는 array 생성 [2,4,5]
    let totalScore = [];
    keys.forEach((item) => {
        totalScore.push(answer.reduce((prev, curr) => {
            return prev + curr[item];
        }, 0));
    });

    // 합친 array 생성 [[galaxy, 2], [iphone, 4], [other, 5]]
    let _result = [];
    for(let i=0; i<keys.length; i++) {
        totalScore.map((argT) => {
            _result.push([keys[i], argT]);
            keys.splice(keys[i], 1);
        });
    };

    // 합친 array에서 value값에 따라 내림차순 [[other, 5], [iphone, 4], [galaxy, 2]
    _result = _result.sort((a, b) => b[1] - a[1]);
```                           

- **내게 딱 맞는 요금제를 추천해드려요**
    - 2개 질문 당 최소 1개 선택지 선택 후, 해당 값에 따라 추천할만한 요금제 노출.
```
    boxAll.forEach((item, index) => { // 선택지 2개 선택했는지 체크
        let radioInputAll = item.querySelectorAll('input[type="radio"]');

        radioInputAll.forEach((item) => {
            if(item.checked) {
                count++;
                if(index === 0) { // 첫번째 질문에 해당하면 dataValue에 value 넣기
                    dataValue.push(item.value);
                } else { // 두번째 질문에 해당하면 callValue에 value 넣기
                    callValue.push(item.value);
                }
            };
        });
    });
```

```
function calculateResult() {
    let calculateResult = plansObj.filter((item) => {
        if(dataValue == 10000 || callValue == 10000) { // 무제한 골랐을 때
            return item.data >= dataValue && item.call >= callValue;
        } else if(dataValue == 6000 || callValue == 300) { // 보통 골랐을 때
            return item.data >= 2000 && item.data < 10000 && item.call >= 100 && item.call < 10000; // 무제한 요금제는 제외
        } else { // 적은거 골랐을 때
            return item.data < dataValue && item.call < callValue;
        }
    });

    showPlanResult(calculateResult); // filter된 데이터를 다음 함수에 전달
};

```
___

### 추가하고 싶은 기능 👀
- [X] 아이콘 사용 시 접근성 위한 hidden 텍스트 표시.
- [X] svg 코드로 아이콘 사용.
- [X] 한 png파일에서 background-position을 활용하여 아이콘 사용.
- [ ] 전체메뉴 만들기.
