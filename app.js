const rollButton = document.querySelector('#roll');
const diceElements = document.querySelector('.dice').children;
let dice = ['empty', 'empty', 'empty'];

const COLORS = ['yellow', 'white', 'pink', 'blue', 'green', 'red'];

const roll = () => {
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