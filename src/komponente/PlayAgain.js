const PlayAgain  = (props) => {
    return ( 
        <div className="game-done">
                <div className="message" style={{color:props.gameStatus==='lost'?'green':'red'}}>
                    {props.gameStatus==='lost' ? 'Game over' : 'You are won'}
                </div>
                <button onClick={props.onClick}>Play again</button>
        </div>
     );
}
 
export default PlayAgain ;