// CompanyDetails.jsx
import React, { useState } from "react";
import "./CompanyDetails2.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
  faInstagram,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import Sideba1 from "../Sideba1";
import SideBarEmp from "../SideBarEmp";

const CompanyDetails2 = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleCallNowClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className="mother-cntainer">
      <SideBarEmp />
      <div className="all">
      <div className="Matrical">
        Matrical Technologies
        <hr />
      </div>
      <div className="menu">
        <div className="software">
          {/* <h1 className="h1">
           Matrical Technologies...
          </h1> */}
          <p className="para456">
          Matrical Technologies, a Bangalore based company leverages on its
          extensive expertise in engineering, design, digital marketing & IT
          services capabilities with exemplary domain and technical knowledge
          providing cost-effective solutions, winding in value addition and
          customer satisfaction across industry steeps. Engineering solutions
          being our core competence, addressing towards our clients assistance
          to obtain featured engineering design solutions within stipulated time
          frame resulting in enhancing operational efficiency, reliability and
          potentially creating valuable market for tradable credits. Matrical
          Technologies is dedicated to providing value-added solutions across
          the globe with our vast engineering, manufacturing, IT, and Digital
          Marketing solutions. We help companies in each stage of the Product
          Life Cycle starting with the preliminary study required to
          conceptualize and understand the product. Our integrated offerings
          span industries. We deliver custom-made solutions depending on what
          your needs are. Our Engineering and Design team of experts help you
          reduce your time to market and cut operating costs while improving
          process and product efficiency.
          </p>
          <hr />
          
        </div>
        <div className="container322114">
          <img
            className="Photo1 rotate"
            src="https://www.signiwis.com/images/background/pattern-1.png"
            alt="User Icon"
          />
        </div>
      </div>

      <div className="last786">
          <div className="feature-block">
            <div className="inner-box">
              <img
                className="Photo2"
                src="https://cdn-icons-png.flaticon.com/128/1851/1851036.png"
                alt="Experience Icon"
              />
            </div>
            <div className="Quick">
              <h6 className="Support">Experience</h6>
              <div className="feature-text">
                We have a great team of consultants with more than
                 15+ years of experience.
              </div>
            </div>
          </div>
          <div className="feature-block">
            <div className="inner-box">
              <img
                className="Photo3"
                src="https://cdn-icons-png.flaticon.com/128/1835/1835948.png"
                alt="Quick Support Icon"
              />
            </div>
            <div className="Quick">
              <h6 className="Support">Quick Support</h6>
              <div className="feature-text">
                Well help you to test bold new ideas while sharing your
                experience.
              </div>
            </div>
          </div>
          </div>

          <div className="align-btn">
         <button className="btn654" onClick={handleCallNowClick}> 
            Call Now
          </button>
          </div>
          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <span className="close" onClick={closePopup}>
                  &times;
                </span>
                <h3>Sorry! we could not process this Request...</h3>
                <div className="Work">Because we are working on it....</div>
                <ul></ul>
              </div>
            </div>
          )}
      <div className="blue1">
        {/* <div className="spinning-circle"></div>
        <div className="spinning-circle-reverse"></div> */}
<div className="center453">
        <img
          className="boy"
          src="https://www.signiwis.com/images/resource/about-5.jpg"
        />
        </div>
        <div className="notes">
          <div className="engagement">
            Engagements that add value at various stages
          </div>
          <p className="At">
            {" "}
           <span> <FontAwesomeIcon icon={faCircleCheck} /></span> <span className="span432">At Matrical Technologies,
            we have a closed loop cycle that helps us to ensure that
            improvements are in place irrespective of the initiative.</span>
          </p>
          <p className="At">
            {" "}
            <span><FontAwesomeIcon icon={faCircleCheck} /> </span>   <span className="span432">Targeted performance
            enhancement of various operational metrics like reliability, working
            capital, speed.</span>
          </p>
          <p className="At">
            {" "}
            <span> <FontAwesomeIcon icon={faCircleCheck} /></span> <span className="span432"> Future state and current
            state development with a capability roadmap.</span>
          </p>
          <p className="At">
            {" "}
            <span> <FontAwesomeIcon icon={faCircleCheck} /></span> <span className="span432"> Business case development
            and value realization benchmarking.</span>
          </p>
          <p className="At">
            {" "}
            <span><FontAwesomeIcon icon={faCircleCheck} /></span> <span className="span432">Organizational change
            management.</span>
          </p>
          <p className="At">
            {" "}
            <span><FontAwesomeIcon icon={faCircleCheck} /></span> <span className="span432">Focusing on
            customer-centric experiences with design thinking.</span>
          </p>
        </div>
      </div>
      {/* Add more ProcessBlocks as needed */}
      <div></div>
      <div className="box1">
        <div className="inner">
          <div className="number-box"><span>01</span></div>
          <h4 className="padddinh321">
            <a className="miss" href="#">
              Mission
            </a>
          </h4>
          <div className="text">
            Our sole objective is to leverage the ever-expanding technology for affluent business development.
          </div>
        </div>
        <div className="inner">
          <div className="number-box"><span>02</span></div>
          <h4 className="padddinh321">
            <a className="miss" href="#">
              Vision
            </a>
          </h4>
          <div className="text">
            With effective use of big data and a combination of business
            management, technical proficiency, and project insights, we envision
            holistic enterprise growth.
          </div>
        </div>
      </div>
      <div className="last">
        <div className="corporate-office width43">
          <h2 className="heading321">Corporate Office</h2>
          <hr />
          <div className="address">
            <p className="location">
              <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
              <span className="adress">Address</span>: First Floor, Raghvendra,
              Complex, <br />
              Remco Bhel Layout, BEML Layout 3rd Stage, Rajarajeshwari Nagar,
              
              Bengaluru, Karnataka 560098
            </p>
            <span className="phone">
              <FontAwesomeIcon icon={faPhone} /> Phone: 090360 12831
            </span>
            <span className="email">
              <FontAwesomeIcon icon={faEnvelope} />{" "}
              <a href="https://www.matrical.in/contact.php ">
                Help: support@matrical.in
              </a>
            </span>
          </div>
        </div>

        <div className="corporate-office1 width43">
          <h2 className="heading321">Follow Us on Social Media</h2>
          <hr />
          <div className="social-icons">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} className="icon facebook-icon" />
              
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} className="icon linkedin-icon" />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} className="icon twitter-icon" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} className="icon instagram-icon" />
            </a>
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGoogle} className="icon google-icon" />
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CompanyDetails2;