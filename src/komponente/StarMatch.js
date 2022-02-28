import { useEffect, useState } from "react";
import Button from "./Button";
import '../StarMatch.css';
import Star from "./Star";
import PlayAgain from "./PlayAgain";
import GameAgain from "./GameAgain";
/*function Random() {
    var maxNumber = 9;
    var randomNumber = Math.floor((Math.random() * maxNumber) + 1);
    return <div>{randomNumber}</div>;
  }*/
const StarMatch = (props) => {
    const [stars,setStars]=useState(utils.random(1,9));
    const [availableNums,setAvailableNums]=useState(utils.range(1,9));
    const [candidateNums,setCandidateNums]=useState([]);
    const [secondsLeft,setSecondsLeft]=useState(10);
    
    const candidateAreWrong=utils.sum(candidateNums)>stars;
    //const gameIsWon =availableNums.length===0;
    //const gameIsLost=secondsLeft===0;
    const gameStatus=availableNums.length===0 ? 'won' : secondsLeft===0 ? 'lost' : 'active';
     

    
    const numberStatus = (number)=>{
        if(!availableNums.includes(number))
        {
            return 'used';
        }
        if(candidateNums.includes(number))
        {
            return candidateAreWrong?'wrong':'candidate';
        }
        return 'available';

    }; 
    
    const onNumberClick=(number,currentStatus)=>{
          if(currentStatus=='used' || gameStatus!=='active')
           {return;} 
        const newCandidateNums=
        currentStatus==='available'
        ?candidateNums.concat(number)
        :candidateNums.filter(cn=>cn!==number);

        candidateNums.concat(number);
        if(utils.sum(newCandidateNums)!==stars)
        {
            setCandidateNums(newCandidateNums);
        } 
        else
        {
            
            const newAvailableNums=availableNums.filter(
                n=> !newCandidateNums.includes(n)
            );
            setStars(utils.randomSumIn(newAvailableNums,9));
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
    }

    const resetGame = () => {
      setStars(utils.random(1,9));
      setAvailableNums(utils.range(1,9));
      setCandidateNums([]);
    }

    useEffect(()=>{
      if(secondsLeft>0 && availableNums.length>0)
      {
        const timerId=setTimeout(()=>{
          setSecondsLeft(secondsLeft-1);
        },1000);
        return()=>clearTimeout(timerId);
      }
    });
     
    return ( 
        <div> 
            <div>
                <p>Pick one or more numbers that sum the numbers of the stars</p>
            </div>
            <div className="red">
             <div className="left">
               
                {utils.range(1,9).map(number =>
                <Button  
                key={number} 
                number={number}
                status={numberStatus(number)} 
                onClick={onNumberClick} />
                
                )}
                
             </div>
            <div className="right">
                {gameStatus!=='active'?(<PlayAgain onClick={props.startNewGame} gameStatus={gameStatus}/>):
                (<Star stars={stars}/>)}
             </div>
             </div>

             <div className="timer">Time remaining: {secondsLeft}</div>
        </div>
    );
}
// Color Theme
const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };
  
  // Math science
  const utils = {
    // Sum an array
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),
  
    // create an array of numbers between min and max (edges included)
    range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),
  
    // pick a random number between min and max (edges included)
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),
  
    // Given an array of numbers and a max...
    // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn: (arr, max) => {
      const sets = [[]];
      const sums = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0, len = sets.length; j < len; j++) {
          const candidateSet = sets[j].concat(arr[i]);
          const candidateSum = utils.sum(candidateSet);
          if (candidateSum <= max) {
            sets.push(candidateSet);
            sums.push(candidateSum);
          }
        }
      }
      return sums[utils.random(0, sums.length - 1)];
    },
  };
export default StarMatch;