let counter = 4;

function setup() {
    timer = document.getElementById('timer');

    let interval = setInterval(() => {
        counter--;
        timer.textContent = counter;
        if(counter <= 0){
            clearInterval(interval);
            return timer.textContent = 'GO!';
        }
    }, 1000);
    
};
window.addEventListener('DOMContentLoaded', setup);