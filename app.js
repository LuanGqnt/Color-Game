const rollButton = document.querySelector('#roll');
const diceElements = document.querySelector('.dice').children;
let dice = ['empty', 'empty', 'empty'];

const COLORS = ['yellow', 'white', 'pink', 'blue', 'green', 'red'];
const boardElement = document.querySelector('.board');
const colorElements = boardElement.children;

// ! GAME STATES
// - CHOOSE_COLOR
// - BET
// - ROLL
// - REWARD
let gameState = 'CHOOSE_COLOR';

const moneyElement = document.querySelector('#money');
let money = 1000;

// SETTINGS
const MINIMUM_BET = 10;

const updateMoney = () => {
    moneyElement.innerHTML = `Your money: ₱${money}`;
}
updateMoney();

//! CHOOSING COLOR
const colorClick = (colorElement) => {
    if(gameState !== 'CHOOSE_COLOR') {
        // alert('The game state is not CHOOSE_COLOR');
        return;
    }

    // Adds a form that asks how much they want to bet
    const div = document.createElement('div');
    div.classList.add('betDiv');

    const input = document.createElement('input');
    input.classList.add('betAmount');
    input.type = "number";
    div.appendChild(input);

    const button = document.createElement('button');
    button.innerHTML = 'BET'
    button.classList.add('betBtn');
    div.appendChild(button);

    button.addEventListener('click', () => {
        bet(colorElement);
    });

    colorElement.appendChild(div);

    gameState = 'BET';
}

for(let i = 0; i < colorElements.length; i++) {
    colorElements[i].addEventListener('click', () => {
        colorClick(colorElements[i]);
    });
}

//! BET
const bet = (colorElement) => {
    if(gameState !== 'BET') {
        alert('The game state is not BET');
        return;
    }

    const betAmount = document.querySelector('.betAmount').value;

    if(betAmount < MINIMUM_BET) {
        alert('The minimum bet is ' + MINIMUM_BET);
        return;
    } else if (money - betAmount < 0) {
        alert('Insufficient funds!');
        return;
    }

    money -= betAmount;
    updateMoney();

    document.querySelector('.betDiv').remove();

    const span = document.createElement('span');
    span.classList.add('betPlaceholder');
    span.innerHTML = `₱${betAmount}`;

    colorElement.appendChild(span);

    alert('Roll!');

    gameState = 'ROLL';
}

//! ROLLING

const roll = () => {
    if(gameState !== 'ROLL') {
        alert('The game state is not ROLLING');
        return;
    }

    for(let i = 0; i < dice.length; i++) {
        const colorChosen = COLORS[Math.floor(Math.random() * COLORS.length)];
        dice[i] = colorChosen;

        if(diceElements[i].classList[1] === 'empty') {
            diceElements[i].classList.replace('empty', colorChosen);
        } else {
            for(let j = 0; j < COLORS.length; j++) {
                diceElements[i].classList.replace(COLORS[j], colorChosen)
            }
        }
    }
}  
rollButton.addEventListener('click', roll);