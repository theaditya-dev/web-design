document.body.innerHTML = `
<h1>Digital Clock</h1>
<h2 id="clock"></h2>
`;

function updateClock(){
    let now = new Date();

    document.getElementById("clock").innerText =
    now.toLocaleTimeString();
}

setInterval(updateClock,1000);
updateClock();