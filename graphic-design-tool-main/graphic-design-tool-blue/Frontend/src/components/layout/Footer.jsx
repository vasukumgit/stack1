import React from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaXTwitter, FaInstagram } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo */}
        <div className="footer-logo">
          <div className="logo-box">A</div>
          <h2>App Name</h2>
        </div>

        {/* Columns */}
        <div className="footer-columns">

          {/* Column 1 */}
          <div className="footer-column">
            <h4>About</h4>
            <a href="/about">About App Name</a>
            <a href="/newsroom">Newsroom</a>
            <a href="/events">Events</a>
            <a href="/careers">Careers <ArrowUpRightIcon className="footer-arrow-icon" /></a>
            <a href="/social-impact">Social Impact</a>
            <a href="/sustainability">Sustainability</a>
            <a href="/case-studies">Case Studies</a>
          </div>

          {/* Column 2 */}
          <div className="footer-column">
            <h4>Help</h4>
            <a href="/help">Help Center</a>
            <a href="/security">Security</a>
            <a href="/trust">Trust Center</a>
            <a href="/safe-ai">App Name Safe AI</a>
            <a href="/accessibility">Accessibility</a>
            <a href="/enterprise">Enterprise Services</a>
            <a href="/design-school">Design School <ArrowUpRightIcon className="footer-arrow-icon" /></a>
            <a href="/sitemap">Sitemap</a>
          </div>

          {/* Column 3 */}
          <div className="footer-column">
            <h4>Community</h4>
            <a href="/community">App Name Communities</a>
          </div>

          {/* Column 4 */}
          <div className="footer-column">
            <h4>Community</h4>
            <a href="/community">App Name Communities</a>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">

          {/* Social Icons */}
          <div className="footer-social">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaXTwitter /></a>
            <a href="#"><FaInstagram /></a>
          </div>

          {/* Copyright */}
          <div className="footer-copy">
            &copy; 2026 App Name. All Right Reserved.
          </div>

          {/* Terms */}
          <div className="footer-terms">
            <a href="/terms">Terms of Service</a> |
            <a href="/privacy"> Privacy Policy</a>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
