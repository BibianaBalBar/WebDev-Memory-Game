const cards = document.querySelectorAll(".memoryCard");
let isFlipped = false;
let firstCard, secondCard;
let lock = false;
let winGame = document.querySelector(".win");
let counter = 0;

cards.forEach(card => card.addEventListener("click", flip));

function flip() {
    if (lock) return;
    if (this === firstCard) return;
    this.classList.add("flip");
    if (!isFlipped) {
        isFlipped = true;
        firstCard = this;
        return
    }
    secondCard = this;
    check();
}

function check() {
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;
    isMatch ? success() : fail();
}

function success() {
    firstCard.removeEventListener("click", flip);
    secondCard.removeEventListener("click", flip); 
    counter++;  
    if (counter === 8){
        console.log('end');
        winGame.classList.remove("display-none");
    } 
    console.log(counter);
    reset();
}

function fail() {
    lock = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        reset();
    }, 1000);
}

function reset() {
    [isFlipped, lock] = [false, false];
    [firstCard, secondCard] = [null, null];    
}

(function suffle() {
    cards.forEach(card => {
        let position = Math.floor(Math.random() * 16);
        card.style.order = position;
    });
})();


winGame.addEventListener("click", () => {      
    cards.forEach(card => {
        let position = Math.floor(Math.random() * 16);
        card.classList.toggle('flip');
        card.style.order = position;
        winGame.classList.add("display-none");
        counter = 0;
        cards.forEach(card => card.addEventListener("click", flip));
    });        
})






console.log(counter);