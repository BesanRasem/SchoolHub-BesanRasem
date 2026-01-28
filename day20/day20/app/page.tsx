import Link from "next/link";

export default function HomePage(){
  return(
    <div>
    <h1>Home Page</h1>
    <ul>
     <li> <Link href="/about">Go to About</Link></li>
<li><Link href="/contact">Go to Contact</Link></li>

<li><Link href="/services">Go to Services</Link></li>
    </ul>
    </div>
  );

}