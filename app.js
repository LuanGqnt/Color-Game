const rollButton = document.querySelector('#roll');
const diceElements = document.querySelector('.dice').children;
let dice = ['empty', 'empty', 'empty'];

const COLORS = ['yellow', 'white', 'pink', 'blue', 'green', 'red'];
const boardElement = document.querySelector('.board');
const colorElements = boardElement.children;

let colorPlayerBettedOn;
let betAmount;

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

    const betAmount_ = document.querySelector('.betAmount').value;

    if(betAmount_ < MINIMUM_BET) {
        alert('The minimum bet is ' + MINIMUM_BET);
        return;
    } else if (money - betAmount_ < 0) {
        alert('Insufficient funds!');
        return;
    }

    money -= betAmount_;
    updateMoney();

    betAmount = betAmount_;

    document.querySelector('.betDiv').remove();

    const span = document.createElement('span');
    span.classList.add('betPlaceholder');
    span.innerHTML = `₱${betAmount_}`;

    colorElement.appendChild(span);

    colorPlayerBettedOn = colorElement;

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

    gameState = 'REWARD';

    reward();
}  
rollButton.addEventListener('click', roll);

//! REWARD
const reward = () => {
    if(gameState !== 'REWARD') {
        alert('The game state is not REWARD');
        return;
    }

    // colorPlayedBettedOn is the HTML element
    const colorBetted = colorPlayerBettedOn.classList[1];

    let colorsWon = 0;
    let moneyWon = 0;
    let actualMoneyGiven;

    for(let i = 0; i < dice.length; i++) {
        if(dice[i] === colorBetted)
            colorsWon += 1;
    }

    moneyWon = betAmount * colorsWon;
    actualMoneyGiven = moneyWon;
    if(colorsWon >= 1)
        actualMoneyGiven += Number(betAmount);

    setTimeout(() => {
        alert(`You just won ₱${moneyWon} !!!`);
    }, 0);

    money += actualMoneyGiven;
    updateMoney();

    document.querySelector('.betPlaceholder').remove();

    gameState = 'CHOOSE_COLOR'; 
}
