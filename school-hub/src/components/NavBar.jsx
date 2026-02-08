export default function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg ">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">School Hub</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav mx-auto">
        <a className="nav-link active" href="#hero">Home</a>
        <a className="nav-link" href="#feature">Features</a>
        <a className="nav-link" href="#">For Schools</a>
        <a className="nav-link" href="#">For Parents</a>
        <a className="nav-link" href="#contact">Contact</a>
      </div>
    </div>
  </div>
</nav>
    );
}