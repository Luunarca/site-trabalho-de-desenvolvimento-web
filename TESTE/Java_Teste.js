const carousel = document.querySelector(".carousel");
const images = document.querySelectorAll(".carousel img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;

function showImage() {
  carousel.style.transform = `translateX(${-index * 600}px)`; 
  // 600px é a largura definida no CSS
}

nextBtn.addEventListener("click", () => {
  index = (index + 1) % images.length; 
  showImage();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + images.length) % images.length; 
  showImage();
});
