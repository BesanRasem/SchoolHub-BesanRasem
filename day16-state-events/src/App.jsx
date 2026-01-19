import './App.css';
import { useEffect,useState } from "react";

function App() {
     const [products, setProducts] = useState([]);
     useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products); 
      });
  }, []);
   

    return (
        <div style={{ padding: "20px" }}>
          <h2>Products</h2>

          {products.map((product) => (
        <div  key={product.id} className="product-card" >
            <p >Name:{product.title}</p>
          <p >Price: ${product.price}</p>
       </div>
       ))}
           </div>
         );}
          
       
    


  


 

export default App;




