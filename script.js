let cards = document.querySelectorAll('.memory-card')
let counterDisplay = document.querySelector('.noOfClicks')
let gameOver = document.querySelector('.endGame')
let reloadPage = document.querySelector('button')
let noOfClicks = 0;
let firstCard, secondCard
let hasClicked = false
let lockBoard = false;
let gamePoints = 0;

(function shufflecards () {
    cards.forEach(card => {
        card.style.order = Math.floor(Math.random() * 13)
    })
})()

cards.forEach((card) => card.addEventListener('click', flipCard))

function flipCard() {
    if (lockBoard) return
    if (this === firstCard) return
    noOfClicks++;
    counterDisplay.textContent = noOfClicks
    this.classList.add('flip')
    if (!hasClicked) {
        hasClicked = true
        firstCard = this
        return
    }

    secondCard = this
    CheckMatch()
}

function CheckMatch() {
    firstCard.getAttribute('data') === secondCard.getAttribute('data') ? disableCards() : unFlipCards()
}

function disableCards() {
    gamePoints++
    if (gamePoints === 6) gameOver.classList.add('show')
    
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    resetBoard()
}

function unFlipCards() {
    lockBoard = true
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        resetBoard()
    }, 1000)
}

function resetBoard() {
    // [hasClicked, lockBoard] = [false, false];
    // [firstCard, secondCard] = [null, null]

    [hasClicked, lockBoard, firstCard, secondCard] = [false, false, null, null]
}

reload = () => {
    window.location.reload();
}

removeHide = () => {
    gameOver.classList.remove('show')
}

gameOver.addEventListener('click', removeHide)

reloadPage.addEventListener('click', reload);