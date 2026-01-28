
import Image from "next/image";
export default function AboutPage() {
  return (
    <section className="about-page py-5">
      <div className="container">

        
        <div className="text-center mb-5">
          <h1 className="title">About School Hub</h1>
          <p className="subtitle">
            Empowering schools, parents, and students through smart technology.
          </p>
        </div>

       
        <div className="row ">
          <div className="col-lg-6 about-card">
            <h3 className="about-heading">Who We Are</h3>
            <p className="about-text">
              School Hub is a modern digital platform designed to simplify
              communication and management between schools, parents, and students.
              We believe education thrives when everyone is connected.
            </p>

            <h3 className="about-heading  mt-4">Our Mission</h3>
            <p className="about-text">
              Our mission is to provide schools with powerful tools,
              parents with transparency, and students with a better learning experience.
            </p>
          </div>
            <div className="hero-image col-lg-6 ">
            <Image
              src="/images/about-image.png"
              alt="image"
              fill
              className="hero-img"
            />
          </div>


          
        </div>
    


      </div>
    </section>
  );
}
