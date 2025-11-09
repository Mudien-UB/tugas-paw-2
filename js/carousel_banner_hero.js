const images = [
    "https://picsum.photos/1200/600?random=1",
    "https://picsum.photos/1200/600?random=2",
    "https://picsum.photos/1200/600?random=3",
    "https://picsum.photos/1200/600?random=4",
    "https://picsum.photos/1200/600?random=5",
];

let index = 0;
const imgElement = document.getElementById("carouselImage");
const dotsContainer = document.getElementById("dotsContainer");
let dots = [];
let autoSlide;

createDots = () => {
    dotsContainer.innerHTML = "";
    images.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.className = "dot w-3 h-3 rounded-full bg-white/30 cursor-pointer transition";
        dot.addEventListener("click", () => showImage(i));
        dots.push(dot);
        dotsContainer.appendChild(dot);
    });
}

showImage = (i) => {
    index = (i + images.length) % images.length;

    imgElement.style.opacity = 0;
    setTimeout(() => {
        imgElement.src = images[index];
        imgElement.onload = () => {
            imgElement.style.opacity = 1;
        };
    }, 100);

    dots.forEach((dot) => dot.classList.remove("bg-white/60"));
    dots[index].classList.add("bg-white/60");

    resetTimer();
}

resetTimer = () => {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => showImage(index + 1), 10000); // 10 detik
}


createDots();
dots = [...dotsContainer.children];
showImage(0);
resetTimer();