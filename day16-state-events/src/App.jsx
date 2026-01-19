import './App.css';
import { useEffect } from "react";

function App() {
     useEffect(() => {
  fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(data => console.log(data));
     }, []);

    return (
        <h1>useEffect</h1>


  

    );

}

 

export default App;




