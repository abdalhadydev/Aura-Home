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


