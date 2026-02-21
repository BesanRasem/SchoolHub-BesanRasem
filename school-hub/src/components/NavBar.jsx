 function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg ">
  <div className="container-fluid">
    <div className="brand-image d-flex flex-column "> 
      <img
            src="/images/logo-img.png"
            alt="logo image"
          />
          <span className="nav-brand">school hub</span>
          </div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav mx-auto">
  <a className="nav-link active" href="#hero">students</a>
  <a className="nav-link" href="#about">teacher</a>
  <a className="nav-link" href="#services">classes</a>
</div>
    </div>
  </div>
</nav>
    );
}