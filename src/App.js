import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import { useState,useEffect } from "react";
import ReactConfetti from "react-confetti";
import "./style.css";
//Feature updated
export default function App() {
  const [Dies, setDies] = useState(allNewDice());
  const [tenzies,settenzies]=useState(false);
  const [buttontext,setbuttontext]=useState("Roll")
  useEffect(()=>{
    const allHeld = Dies.every(die => die.isHeld)
        const firstValue = Dies[0].value
        const allSameValue = Dies.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            settenzies(true)
            setbuttontext("New Game")
            console.log("You won!")
            
        }

  },[Dies])
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
    if(buttontext==="New Game"){
      setDies(allNewDice())
      setbuttontext("Roll")
      settenzies(false)
    } 
     else{
      setDies(prevDies=>{
        return prevDies.map((Die)=>{
          return Die.isHeld===true?{
            ...Die
          }:
          {
            ...Die,
            value:Math.ceil(Math.random() * 6)
          }
        })
      })
     }

      
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
      {tenzies && <ReactConfetti/> }
       <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={ReRollDice}>{buttontext}</button>
    </main>
  );
}
