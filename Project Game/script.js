/*********************************************
                FIRST PAGE
*********************************************/

document.querySelector('#aboutBox').addEventListener('click', toggleModal);
document.querySelector('#aboutLink').addEventListener('click', toggleModal);

function toggleModal() {
  document.querySelector(`#${this.dataset.hide}`).classList.add('u--blur-fadeout');
  document.querySelector(`#${this.dataset.show}`).classList.remove('u--blur-fadeout');
}

document.querySelector('#startGame').addEventListener('click', toggleModal);
document.querySelector('#startGame').addEventListener('click', clear);
function clear(){
    const menu = document.querySelector('#menu');
    menu.style.display = 'none';
}

document.getElementById('startGame').addEventListener('click', pizza);


/*********************************************
                PIZZA MAKER
*********************************************/

function pizza(){

    // Setup timer and total seconds for playing
    const mins = 2;
    let totalSeconds = mins * 60;

    function createTimer() {
        // Create timer HTML
        const body = document.querySelector('body');
        const timer = document.createElement('div');
        timer.classList.add('time');
        timer.innerHTML = ':';
        body.prepend(timer);
        const minutes = document.createElement('span');
        minutes.textContent = formatTimer(parseInt(totalSeconds / 60));
        timer.prepend(minutes);
        const seconds = document.createElement('span');
        seconds.textContent = formatTimer(totalSeconds % 60);
        timer.append(seconds);

        const counter = setInterval(function() {
            --totalSeconds;
            seconds.textContent = formatTimer(totalSeconds % 60);
            minutes.textContent = formatTimer(parseInt(totalSeconds / 60));
            if (totalSeconds === 0) {
                const divs = document.querySelectorAll("div:not(.time)")
                divs.forEach((el) => {
                    el.remove();
                });
                clearInterval(counter);
            };
        }, 1000);

        function formatTimer(val) {
            let valString = `${val}`;
            if (valString.length < 2) {
                return `0${valString}`;
            } else {
                return valString;
            };
        };
    };
    createTimer();

    // PIZZA GAME is in one big function
    const pizzaGame = function() {
        const winner = document.querySelector(".winner");
        winner ? winner.remove() : winner;

        const body = document.querySelector('body');
        const pizzaContainer = document.createElement('div');
        body.prepend(pizzaContainer);
        const box = document.createElement('div');
        box.classList.add('box');
        box.textContent = '🌳';
        pizzaContainer.prepend(box);
    
        const toDisplay = 20; // level of hardness (how many random element without element fo find)
        let displayAnimals = [];
        let elementsToFind = []; // array of items to find
        let allAnimals;
        const animals = [
            {
                icon: '🦁',
                id: 'lion'
            },
            {
                icon: '🐮',
                id: 'cow'
            },
            {
                icon: '🐷',
                id: 'piggy'
            },
            {
                icon: '🐸',
                id: 'frog'
            },
            {
                icon: '🐧',
                id: 'pinguin'
            },
            {
                icon: '🐦',
                id: 'bird'
            }
        ];
    
        function createAnimals() {
            // create elements in total as toDisplay number is
            for (let i = 1; displayAnimals.length < toDisplay - 1; i++) {
                // generate 3 random elements to find
                for (let y = 0; elementsToFind.length < 3; i++) {
                    const index = Math.floor(Math.random() * animals.length);
                    elementsToFind.push(animals[index].id);
                    displayAnimals.push(animals[index]);
                }
                const index = Math.floor(Math.random() * animals.length);
                displayAnimals.push(animals[index]);
            };
            animals.push({
                icon: '🕷',
                id: 'killer'
            });
            displayAnimals.push(animals[animals.length - 1]);
            animals.pop();
            // sort displayAnimals randomly
            displayAnimals.sort(() => 0.5 - Math.random());
            // start creating elements
            displayAnimals.forEach(function(animal, index) {
                setTimeout(function() {
                    const animalElement = document.createElement('div');
                    animalElement.classList.add('animal');
                    animalElement.textContent = animal.icon;
                    animalElement.dataset.id = animal.id;
                    animalElement.style.top = topLeftRandom();
                    animalElement.style.left = topLeftRandom();
                    pizzaContainer.prepend(animalElement);
                    addFindingEvent();
                }, index * 100);
            });
        }
    
        function findElement() {
            const that = this;
            // find element by it's id
            const isFound = elementsToFind.some((element) => element === that.dataset.id);
            // if you found item then remove it
    
            if (isFound) {
                // remove element from array
                const found = elementsToFind.findIndex((el) => el === that.dataset.id);
                elementsToFind.splice(found, 1);
                that.style.cssText = `left: calc(${getRandomInt(40, 52)}%); top: calc(${getRandomInt(39,50)}%); animation: linear;`;
                that.removeEventListener('click', findElement);
                console.log('to find: ', elementsToFind);
    
                // ******************** WINNER ********************
                if (elementsToFind.length === 0) {
                    console.log(`%c WINNER`, `font-size: 4rem; color: darkgreen`);
                    allAnimals.forEach(removeFindingEvent);
                    setTimeout(function() {
                        pizzaContainer.remove();
                        deliverGame();
                    }, 800);
                } else {
                    console.log(`%c That's correct element!`, `background: lightgreen;`);
                }
            } else if (that.dataset.id === 'killer') {
                allAnimals.forEach(removeFindingEvent);
                console.log('%c YOU LOSE!!!', ' background: black; color: red; font-size: 4rem;');
            } else {
                console.log(`%c WRONG!!!`, `background: red`);
                // shake wrong element when clicked;
                that.classList.add('animation');
                that.addEventListener('animationend', () => that.classList.remove('animation'));
            }
        }
    
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
    
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    
        function topLeftRandom() {
            let random = getRandomInt(0, 90);
            for (let i = 0; random > 37 && random < 55; i++) {
                random = getRandomInt(0, 90);
            }
    
            return `${random}%`;
        }
    
        function addFindingEvent() {
            // If all elements are loaded on page, then add to every element 'click' event with function of finding correct element
            allAnimals = document.querySelectorAll('.animal');
            allAnimals.forEach(function(element) {
                element.addEventListener('click', findElement);
            });
        }
        //function for removing event on every displayed element
        function removeFindingEvent(element) {
            element.removeEventListener('click', findElement);
        }
    
        createAnimals();
        console.log(elementsToFind);
    };
    
    /***********************************
             DELIVER GAME
    ***********************************/
    
    // DELIVER GAME is in one big function
    const deliverGame = function() {
        const body = document.querySelector('body');
        const deliverContainer = document.createElement('div');
        deliverContainer.classList.add('deliver-map');
        body.prepend(deliverContainer);
        const car = document.createElement('div');
        car.classList.add('car');
        car.dataset.px = 'px';
        const suffix = car.dataset.px;
        deliverContainer.prepend(car);
        let carPositionY;
        let carPositionX;
    
        // Div for wrong way effect (red flashback) and for winner effect (full green screen with capture "winner")
        const drivingEffect = document.createElement('div');
        body.prepend(drivingEffect);
    
        const totalWidth = Number(getComputedStyle(deliverContainer).getPropertyValue('width').slice(0, -2));
        const totalHeight = Number(getComputedStyle(deliverContainer).getPropertyValue('height').slice(0, -2));
    
        function getCarPosition(axis) {
            axis === 'x'
                ? (carPositionX = Number(
                        getComputedStyle(document.documentElement).getPropertyValue(`--carPositionX`).slice(0, -2)
                    ))
                : (carPositionY = Number(
                        getComputedStyle(document.documentElement).getPropertyValue(`--carPositionY`).slice(0, -2)
                    ));
        }
    
        // Starting position and rotate of car
        let deg = 90;
        getCarPosition('y');
        getCarPosition('x');
    
        function wrongWay() {
            drivingEffect.classList.add('wrong-way');
            setTimeout(() => {
                drivingEffect.classList.remove('wrong-way');
            }, 100);
        }
    
        function winner() {
            window.removeEventListener('keydown', addKeys);
            setTimeout(() => {
                drivingEffect.classList.add('winner');
                drivingEffect.textContent = 'Bravo!';
                document.documentElement.style.setProperty(`--carPositionX`, 0 + suffix);
                document.documentElement.style.setProperty(`--carPositionY`, 0 + suffix);
                deliverContainer.remove();
                setTimeout(() => {
                    pizzaGame();
                }, 500);
            }, 500);
        }
    
        function rideRight() {
            let cordsX = homesCords.some((home) => {
                // check if car position would be the same as any home's position and would not be equal to deliver home cords
                return (
                    carPositionX + 80 === home.posX &&
                    carPositionY === home.posY &&
                    !(carPositionX + 80 === deliverCords.posX && carPositionY === deliverCords.posY)
                );
            });
            if (cordsX) {
                carPositionX;
                wrongWay();
            } else {
                car.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                deg = 90;
                car.style.transform = `rotate(${deg}deg)`;
                getCarPosition('x');
                if (carPositionX < totalWidth) {
                    carPositionX += 80;
                    document.documentElement.style.setProperty(`--carPositionX`, carPositionX + suffix);
                    if (carPositionY === deliverCords.posY && carPositionX === deliverCords.posX) {
                        winner();
                    }
                }
            }
        }
    
        function rideLeft() {
            let cordsX = homesCords.some((home) => {
                return (
                    carPositionX - 80 === home.posX &&
                    carPositionY === home.posY &&
                    !(carPositionX - 80 === deliverCords.posX && carPositionY === deliverCords.posY)
                );
            });
            if (cordsX) {
                carPositionX;
                wrongWay();
            } else {
                if (deg === 0) {
                    car.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                    car.style.transform = `rotate(-90deg)`;
                    setTimeout(() => {
                        car.style.transition = `top 0.5s, left 0.5s, transform 0s`;
                        deg = 270;
                        car.style.transform = `rotate(${deg}deg)`;
                    }, 100);
                } else {
                    car.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                    deg = 270;
                    car.style.transform = `rotate(${deg}deg)`;
                }
                getCarPosition('x');
                if (carPositionX > 0) {
                    carPositionX -= 80;
                    document.documentElement.style.setProperty(`--carPositionX`, carPositionX + suffix);
                    if (carPositionY === deliverCords.posY && carPositionX === deliverCords.posX) {
                        winner();
                    }
                }
            }
        }
    
        function rideDown() {
            let cordsY = homesCords.some((home) => {
                return (
                    carPositionX === home.posX &&
                    carPositionY + 80 === home.posY &&
                    !(carPositionX === deliverCords.posX && carPositionY + 80 === deliverCords.posY)
                );
            });
            if (cordsY) {
                carPositionY;
                wrongWay();
            } else {
                car.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                deg = 180;
                car.style.transform = `rotate(${deg}deg)`;
                getCarPosition('y');
                if (carPositionY + 80 < totalHeight) {
                    carPositionY += 80;
                    document.documentElement.style.setProperty(`--carPositionY`, carPositionY + suffix);
                    if (carPositionY === deliverCords.posY && carPositionX === deliverCords.posX) {
                        winner();
                    }
                }
            }
        }
    
        function rideTop() {
            let cordsY = homesCords.some((home) => {
                return (
                    carPositionX === home.posX &&
                    carPositionY - 80 === home.posY &&
                    !(carPositionX === deliverCords.posX && carPositionY - 80 === deliverCords.posY)
                );
            });
            if (cordsY) {
                carPositionY;
                wrongWay();
            } else {
                if (deg === 270) {
                    car.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                    deg = 360;
                    car.style.transform = `rotate(${deg}deg)`;
                } else if (deg === 360) {
                    car.style.transition = `top 0.5s, left 0.5s, transform 0s`;
                    deg = 0;
                    car.style.transform = `rotate(${deg}deg)`;
                } else {
                    car.style.transition = `top 0.5s, left 0.5s, transform 0.1s`;
                    deg = 0;
                    car.style.transform = `rotate(${deg}deg)`;
                }
                getCarPosition('y');
                if (carPositionY > 0) {
                    carPositionY -= 80;
                    document.documentElement.style.setProperty(`--carPositionY`, carPositionY + suffix);
                    if (carPositionY === deliverCords.posY && carPositionX === deliverCords.posX) {
                        winner();
                    }
                }
            }
        }
    
        function addKeys(e) {
            if (e.keyCode === 39) {
                rideRight();
            } else if (e.keyCode === 40) {
                rideDown();
            } else if (e.keyCode === 37) {
                rideLeft();
            } else if (e.keyCode === 38) {
                rideTop();
            }
        }
    
        window.addEventListener('keydown', addKeys);
    
        /*********************************************
                        CREATE HOUSES
        **********************************************/
    
        function createRow(startX, endX, startY) {
            for (let x = startX; x <= endX; x += 80) {
                const y = startY;
                const home = document.createElement('div');
                home.classList.add('home');
                home.style.setProperty('left', `${x}px`);
                home.style.setProperty('top', `${y}px`);
                deliverContainer.append(home);
            }
        }
    
        function createColumn(startY, endY, startX) {
            for (let y = startY; y <= endY; y += 80) {
                let x = startX;
                const home = document.createElement('div');
                home.classList.add('home');
                home.style.setProperty('top', `${y}px`);
                home.style.setProperty('left', `${x}px`);
                deliverContainer.append(home);
            }
        }
    
        createColumn(80, 560, 0);
        createRow(160, 720, 0);
        createColumn(0, 640, 1040);
        createColumn(0, 240, 800);
        createRow(160, 560, 160);
        createColumn(240, 240, 160);
        createRow(160, 320, 400);
        createRow(320, 480, 320);
        createColumn(160, 320, 640);
        createRow(720, 880, 480);
        createRow(800, 880, 400);
        createRow(480, 560, 480);
        createRow(480, 880, 640);
        createRow(880, 880, 240);
        createRow(880, 880, 80);
        createColumn(560, 640, 160);
        createRow(240, 320, 560);
    
        // Add to every home element class "home"
        const homes = document.querySelectorAll('.home');
        homes.forEach((home, index) => {
            if (index % 2 === 0) {
                home.style.backgroundImage = "url('img/bulding-top-2.png')";
            } else if (index % 3 === 0) {
                home.style.backgroundImage = "url('img/bulding-top-3.png')";
            }
        });
        // Create empty array for every home's cords (left, top) values
        let homesCords = [];
    
        // For every homes elements push object with it's index and position
        homes.forEach((home, i) => {
            homesCords.push({
                home: i,
                posY: Number(getComputedStyle(home).getPropertyValue('top').slice(0, -2)),
                posX: Number(getComputedStyle(home).getPropertyValue('left').slice(0, -2))
            });
        });
    
        // Choose house to deliver
        function deliverTo() {
            const index = Math.floor(Math.random() * homes.length);
            const deliverTop = Number(getComputedStyle(homes[index]).getPropertyValue('top').slice(0, -2));
            const deliverLeft = Number(getComputedStyle(homes[index]).getPropertyValue('left').slice(0, -2));
            const deliverDiv = document.createElement('div');
            deliverDiv.classList.add('deliver');
            deliverDiv.style.setProperty('left', `${deliverLeft}px`);
            deliverDiv.style.setProperty('top', `${deliverTop}px`);
            deliverContainer.append(deliverDiv);
            homes[index].classList.remove('deliver');
            return homesCords[index];
        }
        // Then I refer to that cords when car is driving (above in code)
        const deliverCords = deliverTo();
    };
    
    /**************************************
                 START GAME 
    ***************************************/
    
pizzaGame();
};


