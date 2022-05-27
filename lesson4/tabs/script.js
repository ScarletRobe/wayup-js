/* 
    Задание 1:

    Доделать слайдер с урока

    1. Переписать код слайдера с урока по видео
    2. Доделать автоматическое переключение слайдов с интвервалом в 2 секунды

*/

/* 
    Задание 2:

    Доделать tabs с урока

    1. Переписать код tabs с урока по видео
    2. Внутри третьей вкладки добавить функционал табов. Количество вкладок: 2. Контент внутри - на ваш вкус 

*/
function changeActiveTab(currentTab) {
    
    const tabsBtn = document.querySelectorAll('.tabs__btn');
    for (let i = 0; i < tabsBtn.length; i++) {
        tabsBtn[i].className = tabsBtn[i].className.replace('active', '');
    }
    if (currentTab.classList.contains('dropdown__button')) {
           const parentDataBtn = currentTab.dataset.btn.charAt(0);
           for (let i = 0; i < tabsBtn.length; i++) {              
               if (tabsBtn[i].dataset.btn == parentDataBtn) {
                    tabsBtn[i].classList.add('active');
               }
        }
    }
    currentTab.classList.add('active');
}

function changeActiveContent (currentContent) {
    for (let i = 0; i < tabsContent.length; i++) {
        tabsContent[i].className = tabsContent[i].className.replace('active', '');
        if (tabsContent[i].dataset.content === currentContent) {
            tabsContent[i].classList.add('active');
        }
    }
}

const tabsButtons = document.querySelector('.tabs__buttons');
const tabsContent = document.querySelectorAll('.tabs__content');

tabsButtons.addEventListener('click', event => {
    const currentTab = event.target.dataset.btn;
    console.log(event.target)
    changeActiveTab(event.target);
    changeActiveContent(currentTab);
})
