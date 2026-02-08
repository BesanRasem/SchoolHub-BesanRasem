import Link from "next/link";
export default function HomePage(){
  return(
    <main style={{display:"grid", gap:12}}>
      <h1>Session 23 - Next.js API Route</h1>
      <p>
        this app contain poth:
        <br/>Backend(API Route)
        <br/>Frontend(Server Component)
      </p>
      <div style={{display:"flex", gap:10 , flexWrap:"wrap"}}>
        <a href='/api/products' style={linkStyle}>  Open/api/products API </a>
        <a href='/api/hello' style={linkStyle}>  Open/api/hello API </a>
        <Link href="/products" style={linkStyle}> Go to /products (SSR Page)</Link>
      </div>
      <hr />
      <p style={{opacity:0.8}}>
        Teaching tip :Ask student which files are fontend vs backend
        <br/>
        <code>page.js</code>,<code>route.js</code>,<code>layout.js</code>
      </p>
 </main>
  );
}
const linkStyle={
  display:"inline-block",
  padding:"10px 12px",
  border:"1px solid #ddd",
  borderRadius:10,
  textDecoration:"none"
};