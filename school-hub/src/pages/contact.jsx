import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();


    if (!name || !email || !message) {
      setErrorMsg("Please fill all fields");
      setSuccessMsg(null);
      return;
    }

    setSuccessMsg("Your message has been sent successfully!");
    setErrorMsg(null);

    setName("");
    setEmail("");
    setMessage("");
  };

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
            <div className="contact-card card p-4">
              <form onSubmit={handleSubmit}>
                {successMsg && (
                  <div className="alert alert-success">{successMsg}</div>
                )}
                {errorMsg && (
                  <div className="alert alert-danger">{errorMsg}</div>
                )}

                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Write your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-outline-primary btn-lg"
                >
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
