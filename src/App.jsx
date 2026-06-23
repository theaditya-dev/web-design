import React, { useState } from "react";

function ArmstrongChecker() {
  const [num, setNum] = useState("");
  const [result, setResult] = useState("");

  const checkArmstrong = () => {
    const number = parseInt(num);
    let temp = number;
    let sum = 0;

    while (temp > 0) {
      let digit = temp % 10;
      sum += digit ** 3;
      temp = Math.floor(temp / 10);
    }

    if (sum === number) {
      setResult(`${number} is an Armstrong Number`);
    } else {
      setResult(`${number} is not an Armstrong Number`);
    }
  };

  return (
    <div>
      <h2>Armstrong Number Checker</h2>

      <input
        type="number"
        placeholder="Enter a number"
        value={num}
        onChange={(e) => setNum(e.target.value)}
      />

      <button onClick={checkArmstrong}>Check</button>

      <h3>{result}</h3>
    </div>
  );
}

export default ArmstrongChecker;