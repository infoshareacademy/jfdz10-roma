let counter = 4;

function setup() {
    timer = document.getElementById('timer');
    timer.textContent='READY?'

    let interval = setInterval(() => {
        counter--;
        timer.textContent = counter;
        if(counter <= 0){
            clearInterval(interval);
            return timer.textContent = 'No i gra się zaczyna :)';
        }
    }, 1000);
    
};
window.addEventListener('DOMContentLoaded', setup);