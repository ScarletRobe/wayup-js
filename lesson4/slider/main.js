const slides = document.querySelectorAll('.slide'),
    dots = document.querySelectorAll('.dot'),
    prev = document.getElementById('btn-prev'),
    next = document.getElementById('btn-next');

let index = 0,
    timer = 0;

function activeSlide (index) {
    for (let slide of slides) {
        slide.classList.remove('active')
    }
    slides[index].classList.add('active')
}

function activeDot (index) {
    for (let dot of dots) {
        dot.classList.remove('active')
    }
    dots[index].classList.add('active')
}

function activeScreen () {
    activeSlide(index);
    activeDot(index);
}

function nextSlide () {
    if (index == slides.length - 1) {
        index = 0;   
        activeScreen();     
    }else {
        index++;
        activeScreen();
    }
}

function prevSlide () {
    if (index == 0) {
        index = 2;   
        activeScreen();     
    }else {
        index--;
        activeScreen();
    }
}
dots.forEach((item, dotIndex) => {
    item.addEventListener('click', () => {
        index = dotIndex;
        activeScreen();
    })
})

prev.addEventListener('click', prevSlide);
next.addEventListener('click', nextSlide);

timer = setInterval(() => nextSlide(), 2000);

