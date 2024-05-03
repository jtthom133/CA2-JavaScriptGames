let wheel = document.getElementsByClassName('wheel')[0];
let rand = Math.floor(Math.random() *  1000); 
let textBox = document.getElementById('question');
let spinBttn = document.getElementById('spinBttn')

function spinWheel() {
    textBox.disabled = true;
    spinBttn.disabled = true;
    wheel.style.transform = "rotate(" + rand + "deg)";
    rand = Math.floor(Math.random() *  1000); 
}

function stopWheel() {
    textBox.disabled = false;
    spinBttn.disabled = false;
    console.log("hi!");
}

// I want to disable the textbook while the wheel spins
function prepareSpin() {
    textBox.disabled = false;
    spinBttn.disabled = false;
    spinWheel();
    setTimeout(stopWheel, 5000);
}