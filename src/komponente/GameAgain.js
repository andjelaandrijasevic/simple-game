import { useState } from "react";
import StarMatch from "./StarMatch";
const GameAgain = () => {
    const [gameId,setGameId]=useState(1);
    return <StarMatch key={gameId} startNewGame={()=>setGameId(gameId+1)}/>;
}
 
export default GameAgain;