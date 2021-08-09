import { Col, Row } from 'react-bootstrap';
import { GoClock } from 'react-icons/go';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { RiCupLine } from 'react-icons/ri';
import { BiMessageRounded } from 'react-icons/bi';

import './AboutUs.scss';

const AboutUs = () => {
  return (
    <div>
      <section className="text-center about-us-section">
        <div className="about-us-header">About Us</div>
        <p className="description">
          <strong>BioQor</strong> got origin in 2020 and vows to provide the
          most efficacious natural solutions to all the lifestyle related issues
          to win the war against physical and mental diseases or stress.
        </p>
      </section>
      <div className="bg-light py-5">
        <section className="vision-mission-section">
          <p className="text-center description">
            21<sup>st</sup> century globe has extracted all our energy with the
            fast-paced life. Every other individual is suffering from a bundle
            of health problems. However, nature soothes every disease without
            any side effects on the body. To battle with the mental and physical
            issues, we devote ourselves towards the mother nature and persevere
            to hunt the healing properties of the earth and it’s environment.
          </p>
          <Row className="mt-5">
            <Col xs={12} md={6}>
              <div className="card">
                <h4>Vision</h4>
                <p>
                  Since threshold we are diligent in accommodating exquisite
                  natural and eco-rich services to the humanity. Derived from
                  herbal remedies, we create indigenous medicines and health
                  products in the contemporary world to root the morals and
                  effectiveness of conventional and herbal treatments.
                </p>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="card">
                <h4>Mission</h4>
                <p>
                  Our modish lifestyle has pushed us to the cluster of diseases
                  and health issues but we stand with you by combining with
                  crude research and development. We aim to serve the society
                  with the most potent, reliant and safe products.
                </p>
              </div>
            </Col>
          </Row>
        </section>
      </div>
      <section className="values-section py-5">
        <div className="text-center">
          <h3 className="values-header">Values</h3>
          <p className="description">
            Our dimensions are based on the 4A’s of string to align the best
            products and services:
          </p>
        </div>
        <Row className="mt-5">
          <Col xs={12} md={6}>
            <div className="card bg-light">
              <div className="c-header">
                <span className="icon">
                  <GoClock className="" />
                </span>
                <span>Authenticity</span>
              </div>
              <p>
                Original products with best quality. Creating and inviting new
                ideas. Equipment and technology for the right things.
              </p>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="card bg-light">
              <div className="c-header">
                <span className="icon">
                  <IoMdCheckboxOutline className="" />
                </span>
                <span>Authority</span>
              </div>
              <p>
                In charge of all the tasks performed. Mistakes and feedbacks
                helps to grow. Never bounce back from the responsibility.
              </p>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="card bg-light">
              <div className="c-header">
                <span className="icon">
                  <RiCupLine className="" />
                </span>
                <span>Assurance</span>
              </div>
              <p>
                True to the given information.Reliable and trustworthy. Promise
                to be unselfish and delivering better with each day.
              </p>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="card bg-light">
              <div className="c-header">
                <span className="icon">
                  <BiMessageRounded className="" />
                </span>
                <span>Agility</span>
              </div>
              <p>
                Capacity and capability for the risks to be taken.Performing
                best in every situation. Enthusiastically driven.
              </p>
            </div>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default AboutUs;
