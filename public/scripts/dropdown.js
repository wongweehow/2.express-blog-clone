const toggle = document.getElementById('drop-down');
const navBody = document.querySelector('nav .nav-body');

toggle.addEventListener('click', () => {
  if (navBody.classList.contains('show')) {
    navBody.classList.remove('show');
  } else {
    navBody.classList.add('show');
  }
});