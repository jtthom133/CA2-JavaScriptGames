//WebDevSimplified made much of the logic in this code.
// Typing Game: Much of its core logic is from WebDevSimplified (github and Youtube) 
// https://github.com/WebDevSimplified/JS-Speed-Typing-Game/tree/master
// His project title: JS-Speed-Typing-Game
// Accessed: 4/25-5/3
// His tutorial: https://www.youtube.com/watch?v=R-7eQIHRszQ&t=863s
// I restyled and added features for my game. 
// All code which was not mine is clearly marked. I am not their owner. 

const randQuote = 'https://api.quotable.io/random';
const quoteElement = document.getElementById("quote");
const typedElement = document.getElementById('input');
const resultElement = document.getElementById('wrapper');
const time = document.getElementById('countTimer');
const mistElement = document.getElementById('mistResult');
const wpmElement = document.getElementById('wpmResult');
const rawpmElement = document.getElementById('rawpmResult');
const accElement = document.getElementById('accResult');
let interID = null;
let timer = 30;
let counter = 1;
let mistakes = 0;
let rawpm = 0;
let wpm = 0;
let acc = 0;

// LINES 21 TO 30 ARE FROM WEBDEVSIMPLIFIED (see main html and above for more details)
function getQuote() {
    return fetch(randQuote)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        return data = data.content;
    })
}

async function displayQuote() {
    hideResults();
    counter = 0;
    timer = 30;
    clearInterval(interID);
    typedElement.value = null; // clear input field
    let myQuote = await getQuote();
    console.log(myQuote);
    quoteElement.innerHTML = ''
    // LINES 45 TO 54 ARE FROM WEBDEVSIMPLIFIED (see main html and above for more details)
    myQuote.split('').forEach(function(char) {
        // Each character has to be styled, and can only be styled with span
        // create a span for each character
        let eachChar = document.createElement('span')
        // assigning char to span then setting each as a child to quoteInput
        eachChar.innerHTML = char;
        quoteElement.appendChild(eachChar);
        })
    // interID holds the ID that setInterval returns
    interID = setInterval(countdown, 1000);
}

// Pretty much the entire function is WebDevSimplified's code
// I modified some parts to fit my additional features
typedElement.addEventListener('input', function() {
    let arrQuote = quoteElement.querySelectorAll('span');
    let arrInput = typedElement.value.split("");
    let complete = true;

    arrQuote.forEach(function(eachChar, index) {
        if (time == 0) {
            showResults()
        }
        if (arrInput[index] == null) {
            eachChar.classList.remove('right');
            eachChar.classList.remove('wrong');
            complete = false;
        } else if (eachChar.innerHTML == arrInput[index]) {
            eachChar.classList.add('right');
            eachChar.classList.remove('wrong');
            complete = true;
        } else {
            eachChar.classList.add('wrong');
            complete = false;
        } 
    })
        if(complete) {
            mistakes = document.querySelectorAll('.wrong').length;
            showResults();
        }
})

function countdown() {
    if (timer < 0) {
        time.innerHTML = time;
        showResults();
    }
    time.innerHTML = timer;
    timer--;
    counter++;
}

function showResults() {
    clearInterval(interID);
    mistakes = document.querySelectorAll('.wrong').length;
    console.log(counter);
    rawpm = Math.round((((typedElement.value.length / 5)) / counter) * 60);
    wpm = Math.round((((typedElement.value.length / 5)- mistakes) / counter) * 60);
    acc = Math.round(((typedElement.value.length - mistakes) / typedElement.value.length) * 100);
    rawpmElement.innerHTML = rawpm;
    wpmElement.innerHTML = wpm;
    mistElement.innerHTML = mistakes;
    accElement.innerHTML = acc;
    resultElement.style.display = "block";
} 

function hideResults() {
    resultElement.style.display = "none";
}