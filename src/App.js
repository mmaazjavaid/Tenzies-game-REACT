import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import { useState } from "react";
import "./style.css";
//Feature updated
export default function App() {
  const [numArray, setnumArray] = useState(allNewDice());

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6));
    }
    return newDice;
  }

  const ReRollDice=()=>{
    setnumArray(allNewDice())
  }

  const diceElements = numArray.map((num) => {
    return <Die key={nanoid()} value={num} />;
  });

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={ReRollDice}>Roll</button>
    </main>
  );
}
