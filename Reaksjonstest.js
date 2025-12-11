const startBtn = document.getElementById('startBtn');
const reactionBtn = document.getElementById('reactionBtn');
const message = document.getElementById('message');
const result = document.getElementById('result');

let startTime;
let timer;
let waiting = false;

startBtn.addEventListener('click', () => {
    startBtn.classList.add('hidden');
    reactionBtn.classList.remove('hidden');
    reactionBtn.textContent = "VENT...";
    message.textContent = "Vent på grønn!";
    result.textContent = "";
    waiting = true;

    
    const delay = Math.random() * 9000 + 1000;

    timer = setTimeout(() => {
        reactionBtn.classList.add('green');
        reactionBtn.textContent = "TRYKK!";
        startTime = Date.now();
        waiting = false;
    }, delay);
});

reactionBtn.addEventListener('click', () => {
    if(waiting){
       
        clearTimeout(timer);
        reactionBtn.classList.remove('green');
        reactionBtn.textContent = "VENT...";
        message.textContent = "For tidlig! Prøv igjen";
        startBtn.classList.remove('hidden');
        reactionBtn.classList.add('hidden');
    } else {
        
        const reactionTime = Date.now() - startTime;
        result.textContent = `Din reaksjonstid: ${reactionTime} ms`;
        reactionBtn.classList.remove('green');
        reactionBtn.classList.add('hidden');
        startBtn.classList.remove('hidden');
        message.textContent = "Trykk START for å prøve igjen!";
    }
});
