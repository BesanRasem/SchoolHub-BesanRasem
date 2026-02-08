async function getProducts() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/api/products`,
        {cach: "no-cache",});

    if (!res.ok) throw new Error("Failed to fetch products");

    return res.json();
}

export default async function ProductsPage() {
    const data = await getProducts();
 const images = [
  "/images/image1.png",
  "/images/image2.png",
  "/images/image3.png"
];


    return (
        <main style={{padding: 24}}>


            <h1>Products</h1>
            <p>Total: {data.total}</p>

            <div style={{
                display: "grid", gap: 12, gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                marginTop: 16
            }}>
                {data.products.map((p , index) =>
                    <div className="card" key={p.id} style={{border: "1px solid #ddd", padding: 12, borderRadius: 10}}>
                        <div className="card-image">
                       <img src={images[index]} alt={p.name} />
                       </div>
                       <div className="card-content">

                        <h3>{p.name}</h3>
                        <p>Price: JOD {p.price}</p>
                        <p>In Stock: {p.inStock ? "Yes" : "No"}</p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}