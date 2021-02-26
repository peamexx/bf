// 변수
let header = document.querySelector('header');
let gnb = header.querySelector('.gnb');

// 메인메뉴(.gnb) 마우스 오버 ---> .depth 노출/비노출
gnb.addEventListener('mouseover', depthOn);
gnb.addEventListener('mouseout', depthOff);

function depthOn() {
    gnb.querySelectorAll('.depth').forEach((item) => item.classList.add('on'));
    header.querySelector('section').classList.add('headerSectionOn');
};

function depthOff() {
    gnb.querySelectorAll('.depth').forEach((item) => item.classList.remove('on'));
};