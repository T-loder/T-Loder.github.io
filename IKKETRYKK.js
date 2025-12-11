const redBtn = document.getElementById('redBtn');
const body = document.body;


let posX = window.innerWidth/2 - redBtn.offsetWidth/2;
let posY = window.innerHeight/2 - redBtn.offsetHeight/2;

redBtn.style.left = posX + 'px';
redBtn.style.top = posY + 'px';
redBtn.style.transform = 'translate(0,0)';

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const btnRect = redBtn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width/2;
    const btnCenterY = btnRect.top + btnRect.height/2;

    const distX = mouseX - btnCenterX;
    const distY = mouseY - btnCenterY;
    const distance = Math.sqrt(distX*distX + distY*distY);

   
    if(distance < 350){
        
        let moveX = (Math.random() - 0.5) * 800; 
        let moveY = (Math.random() - 0.5) * 800;

        posX += moveX;
        posY += moveY;

        
        posX = Math.max(0, Math.min(window.innerWidth - btnRect.width, posX));
        posY = Math.max(0, Math.min(window.innerHeight - btnRect.height, posY));

    
        if(posX === 0 || posX === window.innerWidth - btnRect.width){
            posX = Math.random() * (window.innerWidth - btnRect.width);
        }
        if(posY === 0 || posY === window.innerHeight - btnRect.height){
            posY = Math.random() * (window.innerHeight - btnRect.height);
        }

        redBtn.style.left = posX + 'px';
        redBtn.style.top = posY + 'px';
    }
});


redBtn.addEventListener('click', () => {
    body.style.background = '#ffffff';
    redBtn.style.display = 'none';
});
