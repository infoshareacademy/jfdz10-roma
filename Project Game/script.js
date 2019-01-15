/*********************************************
                PIZZA MAKER
*********************************************/

const body = document.querySelector("body");

const pizzaContainer = document.createElement("div");
pizzaContainer.classList.add("container");
body.prepend(pizzaContainer);

const box = document.createElement("div");
box.classList.add("box");
box.textContent = "🌳";
pizzaContainer.prepend(box);

const toDisplay = 20; // level of hardness (how many random element without element fo find)
let displayAnimals = [];
let elementsToFind = []; // array of items to find
let allAnimals;
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
        id: "frog",
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
    // create elements in total as toDisplay number is
    for (let i = 1; displayAnimals.length < toDisplay -1 ; i++) {
        // generate 3 random elements to find
        for (let y = 0; elementsToFind.length < 3; i++) {
            const index = Math.floor(Math.random() * animals.length);
            elementsToFind.push(animals[index].id);
            displayAnimals.push(animals[index]);
        };
        const index = Math.floor(Math.random() * animals.length);
        displayAnimals.push(animals[index]);
    };
    animals.push({
        icon: "🕷",
        id: "killer",
    });
    displayAnimals.push(animals[animals.length - 1]);
    animals.pop();
    // sort displayAnimals randomly
    displayAnimals.sort(() => 0.5 - Math.random());
    // start creating elements
    displayAnimals.forEach(function(animal, index) {
        setTimeout(function() {
            const animalElement = document.createElement("div");
            animalElement.classList.add("animal");
            animalElement.textContent = animal.icon;
            animalElement.dataset.id = animal.id;
            animalElement.style.top = topLeftRandom(); 
            animalElement.style.left = topLeftRandom();
            pizzaContainer.prepend(animalElement);
            addFindingEvent();
        }, index * 100);
    });
};

function findElement() {
    const that = this;
    // find element by it's id 
     const isFound = elementsToFind.some((element) => element === that.dataset.id);
    // if you found item then remove it

    if (isFound) {
        // remove element from array
        const found = elementsToFind.findIndex(el => el === that.dataset.id)
        elementsToFind.splice(found, 1);
        that.style.cssText = `left: calc(${getRandomInt(40, 52)}%); top: calc(${getRandomInt(39, 50)}%); animation: linear;`;
        that.removeEventListener('click', findElement);
        console.log('to find: ', elementsToFind);
        
        // If every element found then you WIN
        if (elementsToFind.length === 0) {
            console.log(`%c WINNER`, `font-size: 4rem; color: darkgreen`);
            allAnimals.forEach(removeFindingEvent);
            setTimeout(function() {
                pizzaContainer.remove();
                const deliverContainer = document.createElement("div");
                deliverContainer.classList.add("container");
                body.prepend(deliverContainer);
            }, 3000);
        } else {
            console.log(`%c That's correct element!`, `background: lightgreen;`);
        }
    } else if (that.dataset.id === "killer") {
        allAnimals.forEach(removeFindingEvent);
        console.log('%c YOU LOSE!!!',' background: black; color: red; font-size: 4rem;');
    } else {
        console.log(`%c WRONG!!!`, `background: red`);
        // shake wrong element when clicked;
        that.classList.add("animation");
        that.addEventListener("animationend", () => that.classList.remove("animation"));
    };
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function topLeftRandom() {
    let random = getRandomInt(0, 90);
    for (let i = 0; random > 37 && random < 55; i++) {
        random = getRandomInt(0, 90);
    };

    return `${random}%`;
};

function addFindingEvent() {
    // If all elements are loaded on page, then add to every element 'click' event with function of finding correct element
    allAnimals = document.querySelectorAll('.animal');
    allAnimals.forEach(function(element) {
        element.addEventListener('click', findElement);
    });
};
//function for removing event on every displayed element
function removeFindingEvent(element) {
    element.removeEventListener('click', findElement);
};

createAnimals();
console.log(elementsToFind);
