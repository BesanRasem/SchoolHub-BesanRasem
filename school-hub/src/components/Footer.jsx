import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">

        <div className="row gy-4">

          {/* Brand */}
          <div className="col-lg-5 col-md-12">
            <h4 className="footer-brand">School Hub</h4>
            <p className="footer-text">
              A smart platform connecting schools, parents, and students
              in one modern digital experience.
            </p>
          </div>

          {/* Links */}
          <div className="col-lg-3 col-md-6">
            <h6 className="footer-title">Platform</h6>
            <ul className="footer-links">
              <li><a href="#hero">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-6">
            <h6 className="footer-title">Contact</h6>
            <p className="footer-contact">support@schoolhub.com</p>
            <p className="footer-contact">Jordan 🇯🇴</p>
          </div>

        </div>

        <div className="footer-bottom text-center">
          © {new Date().getFullYear()} School Hub. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
