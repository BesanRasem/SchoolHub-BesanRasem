import { useState } from "react";
import ItemCard from "./ItemCard";

function Controls(){
    const [studentName,setName]=useState("");
    const[age,setAge]=useState(18);
    const[major,setMajor]=useState("");
    function increaseAge(){
        setAge(age+1)
      
    }
    function decreaseAge(){
        setAge(age-1)
    }
   function reset(){
    setName("")
    setAge(18)
    setMajor("")
   }
   function changeName() {
  setName("New Student");
}
   return(
    <div>
        <div> <ItemCard studentName={studentName} age={age} major={major} /></div>

        <div className="inputs">
        <input
          type="text"
          placeholder="Enter name"
          value={studentName}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter age"
          value={age}
          readOnly
        />
        <input
          type="text"
          placeholder="Enter major"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </div>
    <div className="row btn">
        <button onClick={increaseAge} className="btn-primary">increase</button>
        <button onClick={decreaseAge} className="btn-primary">decreaee</button>
        <button onClick={changeName} className="btn-primary">Change Name</button>

        <button onClick={reset} className="btn-primary">reset</button>
    </div>
    </div>

   );
  
}
export default Controls;