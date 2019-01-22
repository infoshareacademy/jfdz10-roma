document.querySelector('#aboutBox').addEventListener('click', toggleModal);
document.querySelector('#aboutLink').addEventListener('click', toggleModal);

function toggleModal() {
  document.querySelector(`#${this.dataset.hide}`).classList.add('u--blur-fadeout');
  document.querySelector(`#${this.dataset.show}`).classList.remove('u--blur-fadeout');
}
