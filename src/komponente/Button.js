import React from 'react';
// Color Theme
const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };
  
function Button (props)  {
return(
    <button className='number'
    style={{backgroundColor:colors[props.status]}}
     onClick={()=>props.onClick(props.number,props.status)}>{props.number}</button>
);
}
 
export default Button ;