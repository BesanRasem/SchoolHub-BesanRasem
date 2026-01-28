export default function ContactPage() {
  return (
    <section className="contact-page py-5">
      <div className="container">

        <div className="text-center mb-5">
          <h1 className="title">Contact Us</h1>
          <p className="subtitle">
            We'd love to hear from you. Send us a message anytime.
          </p>
        </div>
        <div className="row justify-content-center">

          <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="contact-card card">
              <form>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" placeholder="Your name" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control" placeholder="you@email.com" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Write your message..."
                  ></textarea>
                </div>

                <button className="btn btn-outline-primary btn-lg  ">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          </div>

         
        </div>

      
    </section>
  );
}
