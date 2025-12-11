const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const closeBtn = document.getElementsByClassName("close")[0];

document.querySelectorAll(".img-box img").forEach(img => {
    img.addEventListener("click", ()=>{
        modal.style.display = "block";
        modalImg.src = img.src;
        captionText.innerText = img.alt;
    });
});

closeBtn.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if(event.target == modal){
        modal.style.display = "none";
    }
};
