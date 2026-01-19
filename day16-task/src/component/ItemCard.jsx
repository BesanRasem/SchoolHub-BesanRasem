function ItemCard({studentName,age,major}) {
  
  return (
    <div className="card">
      <h1>Item Profile</h1>
      <p>Name:{studentName}</p>
      <p>Age: {age}</p>
      <p>Major: {major}</p>
    </div>
      
  );
}

export default ItemCard;
