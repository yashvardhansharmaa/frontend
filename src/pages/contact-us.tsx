import React from "react";
import Layout from "../components/Layout";
import contactLight from "../assets/contact-light.svg";
import contactDark from "../assets/contact-dark.svg";
import { useTheme } from "../components/ThemeProvider";

const ContactUs = () => {
  const { theme } = useTheme();
  return (
    <Layout>
      <div className="container mx-auto md:grid flex flex-col md:grid-cols-2 md:mt-32 mb-32">
        <div>
          {theme ? (
            <img src={contactDark} alt="" />
          ) : (
            <img src={contactLight} alt="" />
          )}
        </div>
        <div className="flex flex-col mx-2 items-center justify-center pt-10 md:p-0">
          <h2 className="font-heading text-4xl">
            We'd <span style={{ color: "var(--primary)" }}>love</span> to hear
            from you
          </h2>
          <hr
            style={{
              width: "20%",
              borderTopWidth: "2px",
              borderColor: "var(--primary)",
            }}
          />
          <p className="text-xl my-2">contact@thetidingsblog.com</p>
          <button className="py-1 px-2 bg-primary text-onPrimary rounded-md">
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="mailto:contact@thetidingsblog.com"
            >
              Contact Us
            </a>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
