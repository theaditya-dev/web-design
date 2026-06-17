let heading =
document.getElementById("mainHeading");

let paragraph =
document.getElementById("paragraph");

let input =
document.getElementById("userInput");

let fontSize = 18;

document
.getElementById("changeTextBtn")
.addEventListener(
"click",
function(){

    if(input.value !== ""){
        heading.innerHTML =
        input.value;
    }
}
);

document
.getElementById("bgColorBtn")
.onclick = function(){

    let colors = [
        "#1b1b1b",
        "#0f9b0f",
        "#009688",
        "#3f51b5",
        "#9c27b0",
        "#ff5722"
    ];

    document.body.style.background =
    colors[
        Math.floor(
            Math.random() *
            colors.length
        )
    ];
};

document
.getElementById("fontSizeBtn")
.addEventListener(
"click",
function(){

    fontSize += 2;

    paragraph.style.fontSize =
    fontSize + "px";
}
);

document
.getElementById("toggleBtn")
.addEventListener(
"click",
function(){

    if(
        paragraph.style.display
        ===
        "none"
    ){
        paragraph.style.display =
        "block";
    }
    else{
        paragraph.style.display =
        "none";
    }
}
);

document
.getElementById("resetBtn")
.addEventListener(
"click",
function(){

    heading.innerHTML =
    "Welcome to JavaScript Lab";

    paragraph.style.display =
    "block";

    paragraph.style.fontSize =
    "18px";

    document.body.style.background =
    "linear-gradient(135deg,#000000,#0f9b0f,#38ef7d)";

    input.value = "";

    fontSize = 18;
}
);