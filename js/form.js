var button = document.getElementById('button');

button.addEventListener('click', function(e) {
    var mail = document.getElementById('mail');

    if (mail.value !== '@') {
        e.preventDefault();
        mail.setCustomValidity('Wpisz swój email');
    } else {
        mail.setCustomValidity('');
    }
});