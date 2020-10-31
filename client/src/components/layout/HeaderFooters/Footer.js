import React from "react";

export default function Footer() {
  return (
    <div>
      <footer id="footer">
        <div className="footer-top">
          <div className="container" data-aos="fade-up">
            <div className="row  justify-content-center">
              <div className="col-lg-6">
                <h3>Libri</h3>
                <p>Connect with us on Social Media</p>
              </div>
            </div>

            <div className="social-links">
              <a href="https://twitter.com/" className="twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://facebook.com" className="facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://instagram.com" className="instagram">
                <i className="fab fa-instagram-square"></i>
              </a>
              <a href="https://linkedin.com" className="linkedin">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="container footer-bottom clearfix">
          <div className="copyright">
            Copyright: &nbsp;<b>Libri</b> All Rights Reserved &nbsp;&nbsp;
            <span>Terms of Use &nbsp;</span> <span>Privacy Policy</span>
          </div>
          <div className="credits"></div>
        </div>
      </footer>
    </div>
  );
}
