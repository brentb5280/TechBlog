
const $modalCloseButtons = Array.prototype.slice.call(document.querySelectorAll(".modal-card .delete"), 0);

$modalCloseButtons.forEach(el => {
   el.addEventListener('click', () => {
      document.querySelector(".modal.is-active").classList.toggle("is-active");
   });
});
   