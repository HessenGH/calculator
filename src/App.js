import { wait } from "@testing-library/user-event/dist/utils";
import { useState,useEffect } from "react";

function App() {
  const [calc,setClac]=useState(()=> 0);
  const [result,setResult]=useState(()=>"");
  const [historyList, setHistoryList] = useState([]);

    const ops=['/','*','+','-','.'];
    
    const updateClac=value=>{
      if(ops.includes(value) && calc==='' ||
      ops.includes(value) && ops.includes(calc.slice(-1))
      )
      { return; }
      setClac(calc+value);
    }

  const deleteAll=()=>{
    setResult("");
    setClac("");
  }
  const createDigits=()=>{
    const digits=[];
    for(let i=1;i<10;i++){
      digits.push(
      <button 
      onClick={()=>updateClac(i.toString())}
      key={i}>{i}</button>
      )
    }
    return digits;
  }
  const calculate=()=>{
    setResult(eval(calc).toString());
    hi();
  }
  const hi=()=>{
    setHistoryList(current=>[...current,result]);
    console.log(historyList);
  }
 
  const deleteLast=()=>{
    if(calc===''){
      return ;
    }
    const value=calc.slice(0,-1);
    setClac(value);
  }
  return (
    <div className="App">
          <div className="historylist">
            {historyList.map((res)=>{
              return <h2 className="history">{res}</h2>;
            })}  
        </div>
      <div className="calculator"> 
      
      <div className="display">
        <h4>{calc || "0"}</h4>
        {result || "0"}
        </div> 
        <div className="operator">
        <button onClick={hi}>History</button>
          <button onClick={deleteAll}>AC</button>
          <button onClick={()=>updateClac('/')}>/</button>
          <button onClick={()=>updateClac('*')}>*</button>
          <button onClick={()=>updateClac('+')}>+</button>
          <button onClick={()=>updateClac('-')}>-</button>
          <button onClick={deleteLast}>DEL</button>
        </div>
        <div className="digits">
          {createDigits()}
          <button onClick={()=>updateClac('0')}>0</button>
          <button onClick={()=>updateClac('.')}>.</button>
          <button onClick={calculate}>=</button>
          
        </div>
    
        </div>
    </div>
  );
}

export default App;
