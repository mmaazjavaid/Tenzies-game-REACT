import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import { useState } from "react";
import "./style.css";
//Feature updated
export default function App() {
  const [Dies, setDies] = useState(allNewDice());

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value:Math.ceil(Math.random() * 6),
        isHeld:false,
        id:nanoid()
      });
    }
    return newDice;
  }

  const ReRollDice=()=>{
    setDies(allNewDice())
  }

  const diceElements = Dies.map((die) => {
    return <Die key={die.id} handleClick={()=>holdDice(die.id)} isHeld={die.isHeld} value={die.value} />;
  });


  const holdDice=(id)=>{
    setDies((prevDies)=>{
      return prevDies.map((Die)=>{
        return Die.id===id? {
          ...Die,
          isHeld:true
        }
        :{
          ...Die
        }
      })
    })

  }

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={ReRollDice}>Roll</button>
    </main>
  );
}
