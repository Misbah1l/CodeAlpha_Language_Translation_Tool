/* =======================================================
   AI Language Translator
   CodeAlpha Internship
======================================================= */

const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");

const copyBtn = document.getElementById("copyBtn");
const swapBtn = document.getElementById("swapBtn");
const speakBtn = document.getElementById("speakBtn");
const downloadBtn = document.getElementById("downloadBtn");

const sourceLanguage = document.getElementById("sourceLanguage");
const targetLanguage = document.getElementById("targetLanguage");

const loader = document.getElementById("loader");
const toast = document.getElementById("toast");


// =======================================
// Character & Word Counter
// =======================================

function updateCounter() {

    const text = inputText.value;

    charCount.textContent = text.length;

    const words = text.trim();

    if (words === "") {
        wordCount.textContent = 0;
    } else {
        wordCount.textContent = words.split(/\s+/).length;
    }

}

inputText.addEventListener("input", updateCounter);
updateCounter();


// =======================================
// Copy Translation
// =======================================

copyBtn.addEventListener("click", () => {

    if (outputText.value.trim() === "") {
        alert("Nothing to copy!");
        return;
    }

    navigator.clipboard.writeText(outputText.value);

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);

});


// =======================================
// Swap Languages
// =======================================

swapBtn.addEventListener("click", () => {

    let temp = sourceLanguage.value;
    sourceLanguage.value = targetLanguage.value;
    targetLanguage.value = temp;

});


// =======================================
// Load Browser Voices
// =======================================

let voices = [];

function loadVoices() {
    voices = window.speechSynthesis.getVoices();
}

loadVoices();

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
}


// =======================================
// Text To Speech
// =======================================

speakBtn.addEventListener("click", () => {

    if (outputText.value.trim() === "") {
        alert("Please translate some text first.");
        return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(outputText.value);

    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    // Browser default voice use karo
    window.speechSynthesis.speak(speech);

});
    


// =======================================
// Download Translation
// =======================================

downloadBtn.addEventListener("click", () => {

    if (outputText.value.trim() === "") {
        alert("Nothing to download!");
        return;
    }

    const blob = new Blob([outputText.value], {
        type: "text/plain"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "Translated_Text.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

});


// =======================================
// Loading Animation
// =======================================

const form = document.getElementById("translatorForm");

form.addEventListener("submit", () => {

    loader.style.display = "block";

});


// =======================================
// Clear Button
// =======================================

const clearBtn = document.querySelector(".btn-clear");

clearBtn.addEventListener("click", () => {

    setTimeout(() => {

        updateCounter();
        outputText.value = "";

    }, 100);

});


// =======================================
// Hide Loader
// =======================================

window.addEventListener("load", () => {

    loader.style.display = "none";

});


// =======================================
// Smooth Fade Animation
// =======================================

document.body.style.opacity = "0";

window.addEventListener("load", () => {

    document.body.style.transition = "opacity 0.5s";
    document.body.style.opacity = "1";

});


// =======================================
// End of File
// =======================================