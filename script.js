// LOADER

// window.addEventListener("click", onLoad);

// window.onLoad = function () {
// const loader = document.querySelector(".loader")
// console.log('kmjjnjhjn', loader);
// loader.classList.add("hidden");
// }




//  TITLES

let sectionTitles = document.querySelectorAll(".section-title");
let homeButton = document.querySelector(".home-btn");
let sections = document.querySelectorAll("section");


for (let i = 0; i < sections.length; i++) {
    let section = sections[i];
    let nextSection = sections[i+1];
    let twiceSectionHeight = (2 * section.clientHeight) - 50;
    let sectionTitle = sectionTitles[i];
    
console.log(twiceSectionHeight, sectionTitle)

gsap.from(sectionTitle, {
    opacity: 0,
    y: 60,
    duration: 0.2,
    scrollTrigger: {
        trigger: section,
        start: "top -20",
        end: "bottom twiceSectionHeight",
        toggleActions: "restart reset restart reset",
        // markers: true,
      },
});

}













// SECTION1: HERO

let layers = document.querySelectorAll(".layer");
let oddLayers = document.querySelectorAll(".odd");
let evenLayers = document.querySelectorAll(".even");
let windowWidth = window.innerWidth;

setTimeout(() => {
    for (let i = 0; i < layers.length; i++) {
        let layer = layers[i];

        layer.classList.add("loaded")
        
    }
}, 4000);

for (let i = 0; i < oddLayers.length; i++) {
    let odd = oddLayers[i];
    odd.addEventListener("click", oddLayerClick);
}

function oddLayerClick (e) {
    e.currentTarget.classList.toggle("animation")
}

for (let i = 0; i < evenLayers.length; i++) {
    let even = evenLayers[i];
    even.addEventListener("click", oddLayerClick);
}

function oddLayerClick (e) {
    e.currentTarget.classList.toggle("animation")
}

gsap.to(oddLayers, {
    x: -1 * windowWidth,
    duration: 0.7,
    ease: Power4.eastIn,
},3);

gsap.from(evenLayers, {
    x: -1 * windowWidth,
    duration: 0.7,
    ease: Power4.eastIn,
},3);










// SECTION 2: WORKS


let works = document.querySelectorAll(".work");
// let worksContainer = document.querySelector(".works-container");


// for (let i = 0; i < works.length; i++) {
    
//     let work = works[i];
    
// }

let detailsContainers = document.querySelectorAll(".work-details-container");
let topDetails = document.querySelectorAll(".top-details");
let bottomDetails = document.querySelectorAll(".bottom-details");


for (let i = 0; i < works.length; i++) {
    let work = works[i];
    let container = detailsContainers[i];
    let topDetail = topDetails[i];
    let bottomDetail = bottomDetails[i]
    
    let tl = gsap.timeline({
        scrollTrigger: {
          trigger: work,
          start: "top center",
          toggleActions: "restart reset restart reset",

        }
    })

    tl.from(container, {
        opacity: 0,
        x: -20,
        duration: 1,
        ease: Power3.easeInOut,
    }, 1);
    
    tl.from(bottomDetail, {
        opacity: 0, 
        y: 8, 
        duration: 0.7,
        ease: Power3.easeInOut,
    }, 1.3);

    tl.from(topDetail, {
        opacity: 0, 
        y: -10, 
        duration: 1,
        ease: Power3.easeInOut,
    }, 1.3);

    console.log(    detailsContainers.length, topDetails.length, bottomDetails.length)

}














// SECTION 3: ABOUT


let leftButton = document.querySelector(".left-btn");
let rightButton = document.querySelector(".right-btn");
let carousel = document.querySelector(".carousel");
let slides = document.querySelectorAll(".slide");
let captions = document.querySelectorAll(".image-caption");
let slideshow = document.querySelector(".slideshow");
let textboxWrapper = document.querySelector(".textbox-wrapper");

leftButton.addEventListener("click", leftButtonCLick);
rightButton.addEventListener("click", rightButtonCLick);
let firstClone = slides[0].cloneNode(true);
let lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

slideshow.append(firstClone);
slideshow.prepend(lastClone);


let transitionWidth = (carousel.clientWidth)/100*12.5;
let index = 6;

function leftButtonCLick () {
    // console.log("test left")
    if (index > 4) {
       
        let previousSlideIndex = index;
        let leftShoulder = index -2;
        let oldRightShoulder = index + 1;
        index--;
        changePosition (previousSlideIndex);   
        subtractPosition (previousSlideIndex, leftShoulder, oldRightShoulder);

        console.log(index)
    }
}

function rightButtonCLick () {
    // switch to next slide

    if (index < 9) {
        let previousSlideIndex = index;
        let rightShoulder = index +2;
        let oldLeftShoulder = index - 1;

        index++;
        changePosition (previousSlideIndex);   
        addPosition (previousSlideIndex, rightShoulder, oldLeftShoulder);
        console.log(index)

    }
}

function changePosition (previousSlideIndex) {
    let slideShowPosition = (index - 6) * transitionWidth * -1;
    slideshow.style.transform = `translateX(${slideShowPosition}px)`;
    textboxWrapper.style.transform = `translateX(${(index - 6) * -440}px)`;
    slides[index].classList.add("active");
    slides[previousSlideIndex].classList.remove("active");
    captions[index].classList.add("active");
    captions[previousSlideIndex].classList.remove("active");
}

function addPosition (previousSlideIndex, rightShoulder, oldLeftShoulder) {
    slides[oldLeftShoulder].classList.remove("plus-minus");
    slides[previousSlideIndex].classList.add("plus-minus");
    slides[index].classList.remove("plus-minus");
    slides[rightShoulder].classList.add("plus-minus");
}

function subtractPosition (previousSlideIndex, leftShoulder, oldRightShoulder) {
    slides[oldRightShoulder].classList.remove("plus-minus");
    slides[previousSlideIndex].classList.add("plus-minus");
    slides[index].classList.remove("plus-minus");
    slides[leftShoulder].classList.add("plus-minus");
}















// SECTION 4: CONTACT

const nameInput = document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const success = document.querySelector("#success");
const errorNodes = document.querySelectorAll(".error");


 
function validateForm () {

    clearMessage();

    let errorFlag = false;

    if (nameInput.value.length < 1) {
        errorNodes[0].innerText = "Name cannot be blank";
        nameInput.classList.add("error-border");
        errorFlag = true;
        
    }

    if (!emailIsValid(email.value)) {
        errorNodes[1].innerText = "Invalid email address";
        email.classList.add("error-border"); 
        errorFlag = true;   
    }

    if (message.value.length < 1) {
        errorNodes[2].innerText = "Please enter message";
        message.classList.add("error-border");
        errorFlag = true;
        
    }

    if (!errorFlag) {
        success.innerText = "Thank you :)"
    }
}

// clear error / success message 
function clearMessage () {

    for (let i = 0; i < errorNodes.length; i++) {
        const element = errorNodes[i];
        errorNodes[i].innerText = ""
    }

    success.innerText = "";
}

function emailIsValid(email) {
     let pattern = /\S+@\S+\.\S+/;
     return pattern.test(email);
}


let address = document.querySelector(".address");
let phone = document.querySelector(".phone");
let CV = document.querySelector(".CV");


gsap.to(address, {
    scrollTrigger: {
        trigger: address,
        start: "top bottom",
        toggleActions: "restart reset restart reset",
    },
    y: -110,
    duration: 0.5,
    ease: Power4.eastIn,
}, 1);

gsap.from(address, {
    scrollTrigger: {
        trigger: address,
        start: "top bottom",
        toggleActions: "restart reset restart reset",
    },
    x: -210,
    duration: 0.5,
    ease: Power4.eastIn,
}, 1);


gsap.to(phone, {
    scrollTrigger: {
        trigger: phone,
        start: "top bottom",
        toggleActions: "restart reset restart reset",
    },
    y: -160,
    duration: 0.5,
    ease: Power4.eastIn,
}, 1);

gsap.from(phone, {
    scrollTrigger: {
        trigger: phone,
        start: "top bottom",
        toggleActions: "restart reset restart reset",
    },
    x: -210,
    duration: 0.5,
    ease: Power4.eastIn,
}, 1);

gsap.to(CV, {
    scrollTrigger: {
        trigger: CV,
        start: "top bottom",
        toggleActions: "restart reset restart reset",
    },
    y: -210,
    duration: 0.5,
    ease: Power4.eastIn,
}, 1);

gsap.from(CV, {
    scrollTrigger: {
        trigger: CV,
        start: "top bottom",
        toggleActions: "restart reset restart reset",
    },
    x: -210,
    duration: 0.5,
    ease: Power4.eastIn,
}, 1);

// gsap.from(address, {
//     scrollTrigger: {
//         trigger: address,
//         start: "top bottom",
//         toggleActions: "restart reset restart reset",
//     },
//     x: -200,
//     duration: 0.5,
//     ease: Power4.eastIn,
// });

// gsap.from(phone, {
//     scrollTrigger: {
//         trigger: phone,
//         start: "top bottom",
//         toggleActions: "restart reset restart reset",
//     },
//     x: -200,
//     duration: 0.5,
//     ease: Power4.eastIn,
// });

// gsap.from(CV, {
//     scrollTrigger: {
//         trigger: CV,
//         start: "top bottom",
//         toggleActions: "restart reset restart reset",
//     },
//     x: -300,
//     duration: 0.5,
//     ease: Power4.eastIn,
// });
