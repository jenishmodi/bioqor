import { Col, Row } from 'react-bootstrap';
import { IoLocationOutline, IoPhonePortraitSharp } from 'react-icons/io5';
import { BsEnvelope } from 'react-icons/bs';

import './ContactUs.scss';

const ContactUs = () => {
  return (
    <div>
      <section className="text-center contact-us-section">
        <h3 className="contact-us-header">Contact Us</h3>
        <Row>
          <Col xs={12} md={4}>
            <IoLocationOutline className="icon" />
            <h3 className="m-0">Address</h3>
            <p>
              F-13 Arthvi Arcade, N. H. No. 8, Nr. Rajpipla Chowkdi, Ankleshwar,
              Dist. Bharuch, Gujarat, India
            </p>
          </Col>
          <Col xs={12} md={4}>
            <BsEnvelope className="icon" />
            <h3 className="m-0">Email</h3>
            <p>info@bioqor.in</p>
          </Col>
          <Col xs={12} md={4}>
            <IoPhonePortraitSharp className="icon" />
            <h3 className="m-0">Phone</h3>
            <p>+91 84520 60170</p>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default ContactUs;
