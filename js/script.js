// 변수
let header = document.querySelector('header');
let nav = header.querySelector('nav');

let main = document.querySelector('main');
let slide = main.querySelector('.slide');
let prevBtn = slide.querySelector('.prevBtn');
let nextBtn = slide.querySelector('.nextBtn');
let slideLi = slide.querySelectorAll('li');
let imgWidth = slide.querySelector('img').offsetWidth;


// header > .gnb(메인메뉴) 마우스 오버 ---> .depth 노출/비노출
nav.addEventListener('mouseover', depthOn);
nav.addEventListener('mouseout', depthOff);


// main > .visual > .slide(슬라이더) 클릭 ---> 이미지 돌아가기
prevBtn.addEventListener('click', prevImgSlide);
nextBtn.addEventListener('click', nextImgSlide);


// 함수
function depthOn() {
    nav.querySelectorAll('.depth').forEach((item) => item.classList.add('on'));
    header.querySelector('section').classList.add('headerSectionOn');
};

function depthOff() {
    nav.querySelectorAll('.depth').forEach((item) => item.classList.remove('on'));
};

function prevImgSlide() {
    if(slideLi.length === 1 || parseFloat(getComputedStyle(slideLi[0]).left) === 0) {
        return; // 슬라이드 개수가 1개거나, left가 0일 때 제외
    } else if(slideLi.length > 1) {
        slideLi.forEach((item) => {
            let leftNum = parseFloat(getComputedStyle(item).left);

            item.style.left = leftNum + imgWidth + 'px';
        });
    };
}

function nextImgSlide() {
    if(slideLi.length === 1) {
        return;
    } else if(slideLi.length > 1) {
        slideLi.forEach((item) => {
            let leftNum = parseFloat(getComputedStyle(item).left);

            if(Math.abs(leftNum) === (slideLi.length - 1) * imgWidth) { // 제일 마지막 슬라이드일 때
                item.style.left = 0; // 처음으로 돌아가기
            } else {
                item.style.left = leftNum - imgWidth + 'px';
            }
        });
    };
}