import { FaFacebookF } from 'react-icons/fa';
import { GrLinkedinOption, GrInstagram } from 'react-icons/gr';
import { MdRssFeed } from 'react-icons/md';

import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4">
            <h5 className="">About BioQor</h5>
            <p>
              At <strong>BioQor</strong>, we nurture your physical and mental
              state to lead you towards inner peace and strength. Come step with
              us to heal your insides.
            </p>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="ml-md-5">
              <h5 className="">Our Products</h5>
              <ul>
                <li>Product 1</li>
                <li>Product 2</li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <h5 className="">Contact Info</h5>
            <div className="mt-3">
              <h6 className="m-0">Address:</h6>
              <p>
                F-13 Arthvi Arcade, N. H. No. 8, Nr. Rajpipla Chowkdi,
                Ankleshwar, Dist. Bharuch, Gujarat, India
              </p>
            </div>
            <div className="mt-3">
              <h6 className="m-0">Email:</h6>
              <a href="mailto:info@bioqor.in">info@bioqor.in</a>
            </div>
            <div className="mt-3">
              <h6 className="m-0">Phone:</h6>
              <a href="tel:+918452060170">+91 845 206 0170</a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="d-flex flex-wrap-reverse justify-content-center justify-content-md-between align-items-center">
          <div className="copyright">
            Copyright 2021 BioQor. All rights reserved.
          </div>
          <div className="social-links">
            <a href="https://www.facebook.com/BioQor-114297363707550/">
              <FaFacebookF className="footer-icons" />
            </a>
            <a href="http://www.linkedin.com/in/bioqor-healthcare-0460521b4">
              <GrLinkedinOption className="footer-icons" />
            </a>
            <a href="https://instagram.com/bioqor?igshid=7aavwcvs23f1">
              <GrInstagram className="footer-icons" />
            </a>
            <a href="https://www.bioqor.in/feed/">
              <MdRssFeed className="footer-icons" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
