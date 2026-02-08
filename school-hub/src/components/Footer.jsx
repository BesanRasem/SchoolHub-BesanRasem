export default function Footer(){
    return(
         <footer className="footer mt-5 pt-5">
   <div className="container">
     <div className="row gy-4">
 
       <div className="col-lg-4 col-md-6">
         <h4 className="footer-brand">School Hub</h4>
         <p className="footer-text">
           A smart platform connecting schools, parents, and students
           in one modern digital experience.
         </p>
       </div>
 
      
       <div className="col-lg-2 col-md-6">
         <h6 className="footer-title mb-3 ms-2">Platform</h6>
         <ul className="footer-links">
           <li><Link href="/">Home</Link></li>
           <li><Link href="/about">About</Link></li>
           <li><Link href="/services">Services</Link></li>
           <li><Link href="/contact">Contact</Link></li>
         </ul>
       </div>
 
       <div className="col-lg-3 col-md-6 ">
         <h6 className="footer-title mb-3 ms-3">Support</h6>
         <ul className="footer-links">
           <li><a href="#">Help Center</a></li>
           <li><a href="#">Privacy Policy</a></li>
           <li><a href="#">Terms & Conditions</a></li>
         </ul>
       </div>
 
       <div className="col-lg-3 col-md-6">
         <h6 className="footer-title mb-3">Contact</h6>
         <p className="footer-text-email mb-1"> support@schoolhub.com</p>
         <p className="footer-text"> Jordan</p>
       </div>
 
     </div>
 
 
     <div className="text-center footer-bottom">
       © {new Date().getFullYear()} School Hub. All rights reserved.
     </div>
   </div>
 </footer>

    );
}