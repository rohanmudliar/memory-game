let cards = document.querySelectorAll('.memory-card')
let firstCard, secondCard
let hasClicked = false
let lockBoard = false;

(function shufflecards () {
    cards.forEach(card => {
        card.style.order = Math.floor(Math.random() * 13)
    })
})()

cards.forEach((card) => card.addEventListener('click', flipCard))

function flipCard() {
    if (lockBoard) return
    if(this === firstCard) return
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
    firstCard.getAttribute('data') === secondCard.getAttribute('data')? disableCards(): unFlipCards()
    
}

function disableCards() {
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

