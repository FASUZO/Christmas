const table = document.querySelector('.game-table');
const startButton = document.querySelector('.button-start');
const restartButton = document.querySelector('.button-restart');
const timerElem = document.querySelector('.timer');
const cells = document.querySelectorAll('td');
const rows = 5;
const columns = 5;
const time = 20;
const numbers = [];

let timer;
let restTime = time;
let currentValue = 0;
let pause = false;

const startGame = () => {
   startButton.style.display = 'none';
   timerElem.style.display = 'block';
   restartButton.style.display = 'none';

   createGame();
   timerElem.innerHTML = `Timer: ${restTime}`;
   timer = setInterval(timeStep, 1000);
};

const createGame = () => {
   getNumbers();
   cells.forEach(cell => {
      cell.innerHTML = getRandomNumber();
   });
}

const getNumbers = () => {
   let i = 1;
   while (i <= rows * columns) {
      numbers.push(i);
      i++;
   }
}

const getRandomNumber = () => {
   const pos = Math.random() * numbers.length;
   let randomNumber = numbers.splice(pos, 1);
   return randomNumber;
}

const timeStep = () => {
   restTime--;
   if (restTime > 0) {
      timerElem.innerHTML = `Timer: ${restTime}`;
   } else {
      clearInterval(timer);
      pause = true;
      timerElem.innerHTML = 'Time is up!';
      timerElem.classList.add('lose');
      restartButton.style.display = 'block';
   }
}

const gameRestart = () => {
   restTime = time;
   clearInterval(timer);
   pause = false;
   currentValue = 0;
   cells.forEach(cell => {
      cell.classList.remove('select');
      timerElem.classList.remove('win', 'lose');
   });
   startGame();
}

const init = event => {
   const target = event.target;
   const check = target.classList.contains('td') && !target.classList.contains('select')
      && !pause;
   if (check) {
      const value = +target.innerHTML;
      if (value === currentValue + 1) {
         currentValue++;
         target.classList.add('select');
         if (currentValue === rows * columns) {
            clearInterval(timer);
            timerElem.innerHTML = 'This game is yours!';
            timerElem.classList.add('win');
            restartButton.style.display = 'block';
         }
      }
   }
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', gameRestart);
table.addEventListener('click', init);