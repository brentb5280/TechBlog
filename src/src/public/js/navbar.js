document.addEventListener('DOMContentLoaded', () => {

  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

 
  if ($navbarBurgers.length > 0) {

    
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

  
  const $navbarButtons = Array.prototype.slice.call(document.querySelectorAll('.navbar-item > .buttons > .button'), 0);

  $navbarButtons.forEach(el => {
    if (el.id === 'showLoginModal') {
      el.addEventListener('click', () => {
        document.querySelector("#loginModal").classList.toggle("is-active");  
      });
    }
    if (el.id === 'showRegisterModal') {
      el.addEventListener('click', () => {
        document.querySelector("#registerModal").classList.toggle("is-active");  
      });
    }
  });

});