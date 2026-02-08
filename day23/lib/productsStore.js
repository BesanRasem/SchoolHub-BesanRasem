let products=[

    {id: 1, "name":"Apple","price":100},
    {id: 2, "name":"samsung","price":95},

];
export default getProducts()
{
    return products;
}
export function addProduct(name,price)
{
const cleanName =String(name || "").trim();
const cleanPrice =String(price || 0);

if(!cleanName)
{
    return{Ok :false,error:"product name is required"};
}
if(!cleanPrice){
    return{Ok : false , error:"product price is required"}
}
const newProduct ={
    id: products.length ? products[products.length-1].id +1 :1,
    name:cleanName,
    price:cleanPrice
};
products =[...products , newProduct];
return{ok: true , product:newProduct};
}