const quoteText = [
    "Natenczas Wojski chwycił na taśmie przypięty Swój róg bawoli, długi, cętkowany, \
    kręty Jak wąż boa, oburącz do ust go przycisnął, Wzdął policzki jak banię, \
    w oczach krwią zabłysnął, Zasunął wpół powieki, wciągnął w głąb pół brzucha \
    I do płuc wysłał z niego cały zapas ducha, I zagrał: róg jak wicher, wirowatym \
    dechem Niesie w puszczę muzykę i podwaja echem. \n",

    "Umilkli strzelcy, stali szczwacze zadziwieni Mocą, czystością, dziwną harmoniją pieni. \
    Starzec cały kunszt, którym niegdyś w lasach słynął, Jeszcze raz przed uszami myśliwców \
    rozwinął; Napełnił wnet, ożywił knieje i dąbrowy, Jakby psiarnię w nie wpuścił i rozpoczął łowy. \n",

    "Bo w graniu była łowów historyja krótka: Zrazu odzew dźwięczący, rześki: to pobudka; \
    Potem jęki po jękach skomlą: to psów granie; A gdzieniegdzie ton twardszy jak grzmot: \
    to strzelanie."
];

const addButton = document.getElementById('add');
const setButton = document.getElementById('set');
const deleteButton = document.getElementById('delete');
const resetButton = document.getElementById('reset');
const blockquoteElement = document.getElementsByTagName('blockquote')[0];

let currentIndex = 0;


function addParagraph() {
  if (currentIndex < quoteText.length) {
    const newParagraph = document.createElement('p');
    const paragraphText = document.createTextNode(quoteText[currentIndex]);
    newParagraph.appendChild(paragraphText);
    blockquoteElement.appendChild(newParagraph);
    blockquoteElement.appendChild(document.createElement('br'));
    currentIndex++;
  }

  if (currentIndex === quoteText.length) {
    addButton.disabled = true;
  }
}

function resetBlockquote() {
    while (blockquoteElement.firstChild) {
        blockquoteElement.removeChild(blockquoteElement.firstChild);
    }
    addButton.disabled = false;
    currentIndex = 0;
}


function setStyles(){
    document.getElementsByTagName('header')[0].classList.add('azure');
    document.getElementsByTagName('div')[0].classList.add('wrapper');
    document.getElementsByTagName('div')[1].classList.add('left-col');
    document.getElementsByTagName('div')[3].classList.add('right-col');
    document.getElementsByTagName('nav')[0].classList.add('azure');
    document.getElementsByTagName('main')[0].classList.add('azure');
    document.getElementsByTagName('h1')[0].classList.add('anim-color-change');
    document.getElementsByTagName('h1')[1].classList.add('anim-color-change');
    document.getElementsByTagName('h1')[2].classList.add('anim-color-change');
    document.getElementsByTagName('aside')[0].classList.add('azure');
    document.getElementsByTagName('footer')[0].classList.add('azure');
}

function deleteStyles(){
    let all = document.getElementsByTagName("*");
    for (let i=0, max=all.length; i < max; i++) {
        all[i].classList = [];
    }
}


setButton.addEventListener('click', setStyles);
deleteButton.addEventListener('click', deleteStyles);
addButton.addEventListener('click', addParagraph);
resetButton.addEventListener('click', resetBlockquote);
