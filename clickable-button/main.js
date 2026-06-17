const heading = document.getElementById("mainHeading");
const paragraph = document.getElementById("paragraph");
const input = document.getElementById("userInput");

const changeTextBtn = document.getElementById("changeTextBtn");
const bgColorBtn = document.getElementById("bgColorBtn");
const fontSizeBtn = document.getElementById("fontSizeBtn");
const toggleBtn = document.getElementById("toggleBtn");
const resetBtn = document.getElementById("resetBtn");

let fontSize = 16;
let isVisible = true;

// Change Heading
changeTextBtn.addEventListener("click", () => {
    const newText = input.value.trim();

    if (newText) {
        heading.textContent = newText;
        input.value = "";
    }
});

// Change Background Color
bgColorBtn.addEventListener("click", () => {
    const randomColor =
        "#" + Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");

    document.body.style.backgroundColor = randomColor;
});

// Increase Font Size
fontSizeBtn.addEventListener("click", () => {
    fontSize += 2;
    paragraph.style.fontSize = `${fontSize}px`;
});

// Show / Hide Paragraph
toggleBtn.addEventListener("click", () => {
    isVisible = !isVisible;

    paragraph.style.display = isVisible ? "block" : "none";
    toggleBtn.textContent = isVisible
        ? "Hide Paragraph"
        : "Show Paragraph";
});

// Reset Everything
resetBtn.addEventListener("click", () => {
    heading.textContent = "Welcome to JavaScript Lab";

    fontSize = 16;
    isVisible = true;

    paragraph.style.display = "block";
    paragraph.style.fontSize = "16px";

    document.body.style.backgroundColor = "#3a35d3";

    toggleBtn.textContent = "Hide Paragraph";
    input.value = "";
});