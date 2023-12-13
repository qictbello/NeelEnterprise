import React from "react";
import Layout from "./../components/Layout/Layout";

const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.png"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
