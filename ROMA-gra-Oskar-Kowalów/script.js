const box = document.getElementById("box");
const animal = document.querySelector(".animal")


function createAnimals() {
    const animals = ["🐍", "🦁", "🐮", "🐷", "🐽", "🐸", "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥",];
    const index = Math.floor(Math.random() * animals.length);
    const animal = animals[index];
    const animalElement = document.createElement("div");
    
    animalElement.classList.add("animal");
    animalElement.textContent = animal;
    animalElement.style.top = `${Math.random() * 100 - 50}vh`; 
    animalElement.style.left = `${Math.random() * 100 - 50}vw`;

    animalElement.addEventListener("click", function() {
        console.log(this);
        this.remove();
    });

    box.appendChild(animalElement);
}



var counter = 0;
var animalsInterval = setInterval(function(){
    createAnimals();
    counter++;
    if (counter === 3) {    
        clearInterval(animalsInterval)
    }
}, 1500);

