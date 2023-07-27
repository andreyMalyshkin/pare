document.addEventListener('DOMContentLoaded',() => {
    
function createNumbersArray(count) {
    const cardValue = [];

    for (let i = 1; i <= count; i++) {
        cardValue.push(i);
        cardValue.push(i);
    }

    return cardValue;
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function createCard (count) {
    let card = document.createElement('div');
    let cardCount = document.createElement('span');

    card.classList.add('card');
    card.classList.add('closed')

    cardCount.classList.add('count');
    cardCount.textContent = count;
    card.append(cardCount);



    return card;
}

function createContainer() {
 // Инициируем поля для ввода данных
 let input = document.createElement('input');
 let inputBtn = document.createElement('button');

 input.placeholder = 'Введите количество пар ( Если ввести 6, то будет 12 пар карт)';
 input.type = 'text';
 input.className = 'count-input';
 inputBtn.textContent = 'Новая игра';
 inputBtn.classList ='btn btn-primary';

 document.getElementsByClassName('input-container')[0].append(input);
 document.getElementsByClassName('input-container')[0].append(inputBtn);

 
 inputBtn.addEventListener ('click', () => {
    let count = input.value;
    startGame(count);
})

}

createContainer();



// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

function startGame(count) {
    // Взбалтываем и смешиваем массив
   const arrayOfCards = shuffle(createNumbersArray(count));
   count = count*2;
    let index = 1;
    // убираем возможность отказаться от нашего геймплея
   document.getElementsByClassName('input-container')[0].style.display = 'none';

    let gameContainer = document.getElementsByClassName('game-container')[0];
    gameContainer.innerHTML = '';

    let openedCardsNumber = 0;
    let cardsCount = 0;
    const openedCards = [];
    let clicksCount = 0;


    function cardClick (cardsCount,id) {
        clicksCount++;
        let card = document.getElementById(id);

        if (openedCardsNumber === count - 2) {
            if (cardsCount === 1) {
                card.classList.remove('closed');
                openedCards.push(id);
                compareCards();
                
                cardsCount = 1;
                return cardsCount;
            }
        }

        if (cardsCount === 0 || cardsCount === 1) {
            card.classList.remove('closed');
            openedCards.push(id);
            cardsCount++;
            return cardsCount;
        }

        if (cardsCount === 2) {
            card.classList.remove('closed');
            compareCards();
            openedCards.push(id);
            cardsCount = 1;
            return cardsCount;
        }
    }

    function compareCards () {
        let card1 = document.getElementById(openedCards[0]);
        let card2 = document.getElementById(openedCards[1]);
        openedCards.length = 0;
        if (card1.textContent === card2.textContent) {
            card1.classList.add('good');
            card2.classList.add('good');
            openedCardsNumber+=2;
            isVictore();
        }
        else {
            card1.classList.add('closed');
            card2.classList.add('closed');
        }
    }
   
    function isVictore() {

        if (openedCardsNumber === count) {
            console.log('победа');
          let inputContainer = document.getElementsByClassName('game')[0];

          // Создаем контейнер победы и добавляем его к DOM только один раз

            endContainer = document.createElement('div');
            endContainer.classList.add('container');
            endContainer.classList.add('end-container');
      
            let par = document.createElement('p');
            par.textContent = 'Победа!';
      
            let newGameBtn = document.createElement('button');
            newGameBtn.textContent = 'Новая игра';
            newGameBtn.classList.add('btn');
            newGameBtn.classList.add('btn-primary');
      

            newGameBtn.addEventListener('click', () => {
              // Удаляем контейнер победы перед запуском новой игры
              if (endContainer) {
                endContainer.remove();
                endContainer = null;
              }
              gameContainer.innerHTML = '';
              document.getElementsByClassName('input-container')[0].style.display = 'block';
            });
      
            endContainer.append(par);
            endContainer.append(newGameBtn);
            inputContainer.append(endContainer);
        }
      }
// Размещаем карты на столе и задаем им id в сооствествии с индексом в массиве ( будут от 0 до длины)
    for (let i = 0; i < arrayOfCards.length; i++) {
       let card = createCard(arrayOfCards[i]);
       card.id = index;
       card.addEventListener('click', (event) => {
        const id = event.target.id;
        if (event.target.classList.contains('closed')) {
            cardsCount = cardClick(cardsCount, id);
        }
       })
       gameContainer.appendChild(card);
       index++;
    }
    

} 


})