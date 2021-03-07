// 변수
let windowWidth = window.innerWidth;

let header = document.querySelector('header');
let nav = header.querySelector('nav');

let main = document.querySelector('main');
let visual = document.querySelector('.visual');
let slider = main.querySelector('.slider');
let prevBtn = slider.querySelector('.prevBtn');
let nextBtn = slider.querySelector('.nextBtn');
let contents = slider.querySelector('.contents');
let slide = slider.querySelectorAll('.slide');
let slideCount = 1;

let quiz = document.querySelector('.quiz');
let startArea = quiz.querySelector('.startArea');
let quizStartBtn = quiz.querySelector('.quizStartBtn');
let questionArea = quiz.querySelector('.questionArea');
let questionTitle = quiz.querySelector('.questionTitle');
let questionBtn = quiz.querySelectorAll('.questionBtn'); // All이라 붙이기
let index = quiz.querySelector('.index');
let nextQuestionBtn = quiz.querySelector('.nextQuestionBtn');
let warning = quiz.querySelector('.warning'); // 앞에 quiz워닝 붙여야함
let resultArea = quiz.querySelector('.resultArea');
let resultPhone = quiz.querySelector('.resultPhone');
let indexCount = 1;
let answer = [];

let plan = document.querySelector('.plan');
let planSearchBtn = plan.querySelector('.planSearchBtn');
let planWarning = plan.querySelector('.warning');
let boxs = plan.querySelector('.boxs');
let boxAll = plan.querySelectorAll('.box');
let planResultArea = plan.querySelector('.result');
let planResetBtn = plan.querySelector('.planResetBtn');
let recommendPlan = plan.querySelector('.recommendPlan');
let dataValue = [];
let callValue = [];



// header > .gnb(메인메뉴) 마우스 오버 ---> .depth 노출/비노출
nav.addEventListener('mouseover', depthOn);
nav.addEventListener('mouseout', depthOff);

// main > .visual > .slider 클릭 ---> 이미지 돌아가기
prevBtn.addEventListener('click', prevImgSlide);
nextBtn.addEventListener('click', nextImgSlide);

// .main > .slider 반응형 처리
window.addEventListener('resize', sliderResize);
// .main > .visual height 수동 처리
window.addEventListener('load', setVisualHeight);

// .main > .quiz > .quizStartBtn(테스트 시작) 클릭 ---> 퀴즈 시작
quizStartBtn.addEventListener('click', quizStart);
// .main > .quiz > .questionBtn(선택지) 클릭 ---> 클래스 추가
questionBtn.forEach((item) => item.addEventListener('click', questionBtnSelected));
// .main > .quiz > .nextQuestionBtn(다음) 클릭 ---> 다음 퀴즈 노출
nextQuestionBtn.addEventListener('click', nextQuestionClicked);

// .main > .plan > .planSearchBtn(요금제 확인하기) ---> 결과값 도출
planSearchBtn.addEventListener('click', planSearch);
// .main > .plan > .planResetBtn(테스트 다시하기) ---> 다시 시작
planResetBtn.addEventListener('click', planReset);



// 함수
function depthOn() {
    nav.querySelectorAll('.depth').forEach((item) => item.classList.add('on'));
    header.querySelector('section').classList.add('headerSectionOn');
};

function depthOff() {
    nav.querySelectorAll('.depth').forEach((item) => item.classList.remove('on'));
};

function prevImgSlide() {
    let imgWidth = slide[0].querySelector('img').offsetWidth;

    if(slideCount === 1) { // 첫 슬라이드일 때
        return;
    } else {
        contents.style.left = (-1 * imgWidth * (slideCount - 2)) + 'px';
        visual.style.backgroundColor = slideColor[slideCount - 2];
        slideCount--;
    }
};

function nextImgSlide() {
    let imgWidth = slide[0].querySelector('img').offsetWidth;

    if (slide.length === 1) { // 슬라이드가 1개만 있을 때
        return;
    } else if (slide.length > 1) { // 슬라이드가 여러개 있을 때
        if(slideCount === slide.length) { // 마지막 슬라이드일 때
            contents.style.left = 0;
            visual.style.backgroundColor = slideColor[0];
            slideCount = 1;
        } else {
            contents.style.left = (-1 * imgWidth * slideCount) + 'px';
            visual.style.backgroundColor = slideColor[slideCount];
            slideCount++;
        }
    };
};

function sliderResize() {
    let imgHeight = slide[0].querySelector('img').offsetHeight;

    if(windowWidth < 1200) {
        slide.forEach((item) => item.style.width = windowWidth + 'px');
        visual.style.height = imgHeight + 'px';
    }
};

function setVisualHeight() {
    // 처음 화면 접속 시 화면을 움직이지 않는 이상 resize가 되지 않아 height를 못잡음
    let visualWidth = visual.offsetWidth;

    if(windowWidth < 1200) {
        slide.forEach((item) => item.style.width = visualWidth + 'px'); // visual width만큼 img width 수동 변경
        let imgHeight = slide[0].querySelector('img').offsetHeight; // width가 변경되면서 바뀐 height 기록
        visual.style.height = imgHeight + 'px';
    }
};

function quizStart() {
    startArea.classList.add('off');
    quizStartBtn.classList.add('off');
    questionArea.classList.add('on');
    questionShow();
};

function questionShow() {
    index.textContent = `${indexCount}/4`;
    questionTitle.textContent = questions[indexCount - 1].title;

    let keys = [];
    for (let key in questions[0]) {
        keys.push(key); // ["title", "choice1", "choice2"]
    };

    for (let i = 1; i < keys.length; i++) {
        questionBtn.forEach((item) => {
            item.textContent = questions[indexCount - 1][keys[i]].text;
            keys.splice(keys[i], 1);
        });
    };
};

function questionBtnSelected(e) {
    let target = e.target;

    questionBtn.forEach((item) => item.classList.remove('selected'));
    target.classList.add('selected');
};

function nextQuestionClicked() {
    let selectedBtnCnt = 0;
    let selectedBtn;

    questionBtn.forEach((item, index) => {
        if (item.classList.contains('selected')) {
            selectedBtnCnt++
            selectedBtn = index;
        }
    });

    if (selectedBtnCnt === 0) { // 선택된 버튼이 하나도 없을 때
        warning.classList.add('on');
    } else if (indexCount === 4) { // 마지막 문제일 때
        answer.push(questions[indexCount - 1]['choice' + (selectedBtn + 1)].score);
        yourPhoneIs();
    } else {
        answer.push(questions[indexCount - 1]['choice' + (selectedBtn + 1)].score);
        questionBtn.forEach((item) => item.classList.remove('selected'));
        warning.classList.remove('on');
        indexCount++;
        questionShow();
    }
};

function yourPhoneIs() {
    let keys = [];
    for (let key in answer[0]) {
        keys.push(key); // ["galaxy", "iphone", "other"]
    };

    let totalScore = [];
    keys.forEach((item) => {
        totalScore.push(answer.reduce((prev, curr) => {
            return prev + curr[item]; // [2,4,5]
        }, 0));
    });

    let result = []; //없애도 됨
    let _result = [];
    for (let i = 0; i < keys.length; i++) {
        totalScore.map((argT) => {
            result[keys[i]] = argT; // [galaxy: 2, iphone: 4, other: 5]
            _result.push([keys[i], argT]); // [[galaxy, 2], [iphone, 4], [other, 5]]
            keys.splice(keys[i], 1);
        });
    };

    _result = _result.sort((a, b) => b[1] - a[1]); // [[other, 5], [iphone, 4], [galaxy, 2]

    questionArea.classList.add('off');
    resultArea.querySelector('span').classList.add('on');
    resultArea.classList.add('on');
    resultArea.querySelector('img').setAttribute('src', `./img/${_result[0][0]}01.jpg`);
    console.log(_result);
    resultPhone.textContent = _result[0][0]; // other
};

function planSearch() {
    let count = 0;

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

    if(count < 2) { // 선택지 빼먹은게 있을 때
        planWarning.classList.add('on');
        planWarning.textContent = '각 문항당 선택지를 하나씩 골라주세요';            
    } else { // 선택지 2개 이상 선택했을 때
        planWarning.classList.remove('on');
        calculateResult();
    };
};

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

    showPlanResult(calculateResult);
};

function showPlanResult(arg) {
    boxs.classList.add('off');
    planResultArea.classList.add('on');

    arg.forEach((item) => {
        recommendPlan.innerHTML += item.title + '<br>';

        let tr = document.createElement('tr');
        tr.classList.add('add');
        let td1 = document.createElement('td');
        td1.textContent = item.title;
        let td2 = document.createElement('td');
        td2.textContent = item.data.toLocaleString(); // gb로 나타내기
        let td3 = document.createElement('td');
        td3.textContent = item.call.toLocaleString();
        let td4 = document.createElement('td');
        td4.textContent = item.price.toLocaleString();
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);

        plan.querySelector('tbody').append(tr);
    });
};

function planReset() {
    boxs.classList.remove('off');
    planResultArea.classList.remove('on');
    recommendPlan.innerHTML = '';
    plan.querySelectorAll('.add').forEach((item) => {
        item.remove();
    });

    dataValue = [];
    callValue = [];
};



// Obejct
let slideColor = ['rgb(0, 0, 0)', 'rgb(249, 205, 57)', 'rgb(255, 255, 255)']; //obj뒤에 붙이고s붙이기

//obj뒤에 붙이고
let questions = [
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
    {
        title: '나는 스마트폰을 살때...',
        choice1: {
            text: '무조건 가성비가 최고!',
            score: {
                galaxy: 2,
                iphone: 1,
                other: 3
            }
        },
        choice2: {
            text: '디자인이나 갬성을 느끼는게 최고!',
            score: {
                galaxy: 0,
                iphone: 3,
                other: 1
            }
        }
    },
    {
        title: '스마트폰 보험이 되지 않는다면?',
        choice1: {
            text: '보험/케어는 필수지',
            score: {
                galaxy: 2,
                iphone: 1,
                other: 0
            }
        },
        choice2: {
            text: '난 상관없어! 그럴 일 없거든',
            score: {
                galaxy: 1,
                iphone: 1,
                other: 2
            }
        }
    },
    {
        title: '나는 내가 좋아한다면',
        choice1: {
            text: '불편한 기능이 있어도 그냥 쓸 수 있어!',
            score: {
                galaxy: 0,
                iphone: 3,
                other: 2
            }
        },
        choice2: {
            text: '난 안돼.. 무조건 기능이 다양하고 편해야해!',
            score: {
                galaxy: 3,
                iphone: 1,
                other: 1
            }
        }
    }
];

let plansObj = [
    {
        title: '모두다 무제한',
        data: 10000,
        call: 10000,
        price: 101000
    },
    {
        title: '데이터 걱정없는 77',
        data: 6000,
        call: 300,
        price: 77000
    },
    {
        title: '데이터 걱정없는 66',
        data: 6000,
        call: 100,
        price: 66000
    },
    {
        title: '통화 걱정없는 77',
        data: 4000,
        call: 300,
        price: 77000
    },
    {
        title: '통화 걱정없는 66',
        data: 1000,
        call: 300,
        price: 66000
    },
    {
        title: 'LTE 다이렉트',
        data: 1000,
        call: 50,
        price: 66000
    },
];