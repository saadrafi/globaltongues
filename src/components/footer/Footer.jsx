import React from "react";
import { HiMail } from "react-icons/hi";
import { FaPhoneAlt, FaMapMarkedAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="footer p-10 bg-base-200 text-base-content">
        <div>
          <img src="../../../public/logo.png" alt="" className=" h-20" />
          <p>A better way to learn languages.</p>
        </div>
        <div>
          <span className="footer-title">Address</span>
          <p>
            <span className="font-semibold">
              <FaMapMarkedAlt></FaMapMarkedAlt>
            </span>
            <span>Ambarkhana ,Sylhet 3130</span>
          </p>
          <span className="footer-title">Contact Us</span>
          <p className="flex items-center gap-1">
            <FaPhoneAlt className="text-base"></FaPhoneAlt>
            <span>017777777001</span>
          </p>

          <p className="flex items-center gap-1">
            <HiMail className="text-xl"></HiMail>
            <span>contact@glt.com</span>
          </p>
        </div>
        <div>
          <span className="footer-title">Newsletter</span>
          <div className="form-control w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="email"
                className="input input-bordered w-full pr-16"
              />
              <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </footer>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div>
          <p>Copyright © 2023 - All right reserved by Global Tongues Ltd</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
