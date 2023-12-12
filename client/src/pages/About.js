import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          In 1985 the NEEL Enterprises began with Mr. Nestor N. Ragiles, who once worked as a messenger at his brother's printing shop. He started small, using just Php. 500.00 to register his business and make his own income. With hard work, he grew from one machine to eight, but faced tough times when the economy wasn't good. He made changes to keep going. Today, after 25 years, NEEL Enterprises is thriving, showing Mr. Ragiles' strong spirit.
          Over time, NEEL Enterprises started selling calendars for the new year. Now, the company is stepping into the digital world by creating a web app. This app will make it easy for customers to buy things online quickly. It's an exciting new chapter for NEEL Enterprises.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
