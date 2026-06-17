document.body.innerHTML = `
<h1>Age Calculator</h1>

<input id="birthYear"
placeholder="Enter Birth Year">

<button onclick="calculateAge()">
Calculate
</button>

<h2 id="age"></h2>
`;

window.calculateAge = function(){

    let birthYear =
    Number(document.getElementById("birthYear").value);

    let currentYear =
    new Date().getFullYear();

    let age = currentYear - birthYear;

    document.getElementById("age").innerText =
    "Your Age: " + age;
}