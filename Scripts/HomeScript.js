import{load, setupEvents} from "./StaticScript.js"



await load();
await setupEvents();

const words = ["Elevated", "Tailored", "Artisanal", "Curated", "Flawless"];
const textEl = document.getElementById("typing");

let wordIndex = 0;
let letterIndex = 0;

function type() {
    if (letterIndex < words[wordIndex].length) {
        textEl.textContent += words[wordIndex][letterIndex];
        letterIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 1500);
    }
}

function erase() {
    if (letterIndex > 0) {
        textEl.textContent = words[wordIndex].substring(0, letterIndex - 1);
        letterIndex--;
        setTimeout(erase, 50);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 300);
    }
}

type();

var s=document.getElementById("search-icon");
console.log(s);

document.getElementById("search-icon").addEventListener("click", ()=>{
    document.getElementById("search-bar").scrollIntoView({
        behavior:"smooth",
        block:"end"
    });
})

var ss=document.getElementById("search-button");

document.getElementById("search-button").addEventListener("click", ()=>{
    var search=document.getElementById("search-input").value;
    console.log(search);
    window.location.href="Products-Page.html";
    
});

document.getElementById("search-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.getElementById("search-button").click();
    }
});


const buyNowButtons = document.querySelectorAll(".home-buy");

buyNowButtons.forEach(button => {
    button.addEventListener("click", () => {
        const id = button.dataset.id;
        window.location.href = `/Pages/ProductDetails.html?id=${id}`;
    });
});















/*Fady's Newsettler*/

let email = document.querySelector("#email");
let subscribe = document.querySelector(".btn-subscribe");
let message = document.querySelector(".message");
let emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
subscribe.addEventListener("click", function () {
  let emailValue = email.value.trim();
  if (emailValue === "" || !emailRegx.test(emailValue)) {
    message.textContent = "Invalid email! Please use a valid email";
    message.style.visibility = "visible";
    message.style.color = "#C96A5A";
  } else {
    message.textContent = "Success! You are now subscribed";
    message.style.visibility = "visible";
    message.style.color = "#4F8A7A";
    email.value = "";
  }
});


document.getElementById("email").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        subscribe.click();
    }
});













/*Hamdy's Contact Us*/


try {
    await load();
    await setupEvents();
} catch (e) {
    console.error("StaticScript load failed, but continuing...", e);
}

const contactForm = document.getElementById('jsContactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!contactForm.checkValidity()) {
            contactForm.classList.add('was-validated');
            return;
        }

        const submitBtn = contactForm.querySelector('.btn-send');
        const originalText = submitBtn.innerText;

        const formData = {
            firstName: document.getElementById('fName').value.trim(),
            lastName: document.getElementById('lName').value.trim(),
            email: document.getElementById('userEmail').value.trim(),
            phone: document.getElementById('userPhone').value.trim(),
            message: document.getElementById('userMsg').value.trim(),
            timestamp: new Date().toISOString()
        };

        try {
            submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Sending...`;
            submitBtn.disabled = true;

            console.log("Success! Data collected:", formData);
            alert('Thank you! Your message has been sent successfully.');

            contactForm.reset();
            contactForm.classList.remove('was-validated');
        } catch (error) {
            alert('Error sending message.');
        } finally {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    }, false);
}