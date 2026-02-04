import Link from "next/link";
export default function HomePage(){
  return(
    <main>
      <h1> DeployReady</h1>
      <p> Session 24 project: deploy + Env+ Build optiomization</p>
      <Link href="/products">
      Go to products
      </Link>
    </main>

  );
}