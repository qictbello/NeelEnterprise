import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="mt-3 text-center">
            Adano, Jefferson | qjbadano@tip.edu.ph
          </p>
          <p className="mt-3 text-center">
            Agripa, Kurt | qvkcagripa@tip.edu.ph
          </p>
          <p className="mt-3 text-center">
            Argente, Brent Nolie | qbnpargente@tip.edu.ph
          </p>
          <p className="mt-3 text-center">
            Bello, Ian Carlo | qsjbencito@tip.edu.ph
          </p>
          <p className="mt-3 text-center">
            Bencito, Sonny Jay | qictbello@tip.edu.ph
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
