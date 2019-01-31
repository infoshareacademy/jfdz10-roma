const container = document.getElementById("container");
const box = document.getElementById("box");
const howManyElements = 5; // level of hardness
let countElements = 0; // for setInterval
let countFoundElements = 0;
let chooseRightOnes = ["bird", "lion", "pinguin"]; // array of items to find
const animals = [
    {
        icon: "🦁",
        id: "lion",
    }, 
    {
        icon: "🐮",
        id: "cow",
    }, 
    {
        icon: "🐷",
        id: "piggy",
    },
    {
        icon: "🐸",
        id: "flog",
    },
    {
        icon: "🐧",
        id: "pinguin",
    },
    {
        icon: "🐦",
        id: "bird",
    },
];

function createAnimals() {
    const index = Math.floor(Math.random() * animals.length);
    const animal = animals[index].icon;
    const animalId = animals[index].id;
    const animalElement = document.createElement("div");
    
    animalElement.classList.add("animal");
    animalElement.textContent = animal;
    animalElement.dataset.id = animalId;
    animalElement.style.top = `${Math.random() * 90}%`; 
    animalElement.style.left = `${Math.random() * 90}%`;

    animalElement.addEventListener("click", function() {
        console.log(this.dataset.id);

        // find element by it's is 
        const isFound = chooseRightOnes.some(function(element){
            return element === animalElement.dataset.id;
        });

        // if you found item then remove it
        
        if (isFound) {
            countFoundElements += 1;
            console.log(countFoundElements);
            this.remove();
            if (countFoundElements === chooseRightOnes.length) {
                console.log('You are a winner!')
            } else {
                console.log('play...');
            }
        };

    });

    container.prepend(animalElement);
}

let animalsInterval = setInterval(function(){
    createAnimals();
    countElements++;
    if (countElements === howManyElements) {    
        clearInterval(animalsInterval);
        console.log(document.querySelectorAll('.animal'));
    }
}, 50);


console.log(document.querySelectorAll('.animal').length)