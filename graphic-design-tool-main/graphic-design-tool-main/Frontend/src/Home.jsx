import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { DesignNib, Folder} from "iconoir-react";
import { UserGroupIcon, ArrowUpRightIcon   } from "@heroicons/react/24/outline";
import Footer from "./components/layout/Footer";
import "./components/layout/Footer.css";

// Images
// Banner section image
import bannerImage from "./assets/Home-Page-Imgs/banner-image.jpeg";
// Features images
import Frame1 from "./assets/Home-Page-Imgs/Feature_Frame_1.jpg"
import Frame2 from "./assets/Home-Page-Imgs/Feature_Frame_2.jpg"
import Frame3 from "./assets/Home-Page-Imgs/Feature_Frame_3.jpg"
import Frame4 from "./assets/Home-Page-Imgs/Feature_Frame_4.jpg"
// Templates images
import Template1 from "./assets/Home-Page-Imgs/Template1.jpg";
import Template2 from "./assets/Home-Page-Imgs/Template2.jpg";
import Template3 from "./assets/Home-Page-Imgs/Template3.jpg";
import Template4 from "./assets/Home-Page-Imgs/Template4.jpg";
import Template5 from "./assets/Home-Page-Imgs/Template5.jpg";
import Template6 from "./assets/Home-Page-Imgs/Template6.jpg";
import Template7 from "./assets/Home-Page-Imgs/Template7.jpg";
// How it works Edit images
import Edit1 from "./assets/Home-Page-Imgs/Edit1.jpg"
import Edit2 from "./assets/Home-Page-Imgs/Edit2.jpg"
import Edit3 from "./assets/Home-Page-Imgs/Edit3.jpg"
import paint_Img from "./assets/Home-Page-Imgs/Paint.png"


const images = [Template1, Template2, Template3, Template4, Template5, Template6, Template7];

function Home() {
  const [activeIndex, setActiveIndex] = useState(3); // center image
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const goToTemplates = () => {
    navigate("/templates"); // change route if needed
  };

  const goToSignin = () => {
    navigate("/login");
  }

  
  return (
    <>
        {/* Banner Section */}

      <section className="banner-wrapper">
      <div className="banner-container">
        
        {/* Left Column */}
        <div className="banner-left">
          <h1 className="banner-title">
            Design <span className="gradient-text">Faster.</span>
            <br />
            <span className="blue-text">Publish</span> Everywhere.
          </h1>

          <p className="banner-description">
            Create social posts, ads, presentations, and more with
            simple drag-and-drop tools.
          </p>

          <p className="banner-subtext">
            No design experience needed.
          </p>

          <div className="banner-buttons">
            <button className="primary-btn" onClick={goToSignin}>
              Start free
            </button>

            <button className="secondary-btn" onClick={goToSignin}>
              Explore Templates
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="banner-right">
          <img
            src={bannerImage}
            alt="Design Preview"
            className="banner-image"
          />
        </div>

      </div>
    </section>


    {/* Trusted Section */}

    <section className="trusted-section-wrapper">
      <div className="trusted-section-container">
        
        <h2 className="trusted-section-title">
          Trusted by Creators Worldwide
        </h2>

        <p className="trusted-section-subtitle">
          Creators, marketers, and businesses around the world use our platform
          to design social media graphics, presentations, and marketing materials
          faster and smarter. From small teams to growing brands, thousands trust
          us to bring their ideas to life.
        </p>

        <div className="trusted-stats-grid">
          
          <div className="trusted-stat-card">
            <DesignNib className="trusted-icon gradient-icon" />

            <h3 className="trusted-stat-number">50K +</h3>
            <p className="trusted-stat-text">Designs Created</p>
          </div>

          <div className="trusted-stat-card">
           <Folder className="trusted-icon gradient-icon" />

            <h3 className="trusted-stat-number">1M +</h3>
            <p className="trusted-stat-text">Assets Used</p>
          </div>

          <div className="trusted-stat-card">
                        <div className="icon-wrapper">
                <svg width="0" height="0">
                  <defs>
                    <linearGradient id="iconGradient" x1="0" y1="0" x2="24" y2="24">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>

                <UserGroupIcon className="trusted-icon gradient-icon" />
              </div>
            <h3 className="trusted-stat-number">10K +</h3>
            <p className="trusted-stat-text">Active Creators</p>
          </div>

        </div>
      </div>
    </section>


    {/* Features Section */}

    <section className="features-section">
      <div className="features-container">

        <h2 className="features-title">Features</h2>

        <div className="bento-grid">

            {/* Row 1 - Span 2 */}
            <div className="bento-card bento-large span-2-left">
              <img
                src={Frame1}
                alt="Templates Preview"
                className="bento-image"
                onClick={goToSignin}
              />
            </div>

            {/* Row 1 - 1 Column */}
            <div className="bento-card bento-gradient-purple">
              <h3>Templates Library</h3>
              <p>
                Choose from thousands of ready-made templates
                for social, business, and presentations.
              </p>
            </div>

            {/* Row 2 - 1 Column */}
            <div className="bento-card bento-gradient-orange">
              <h3>Drag & Drop Editor</h3>
              <p>
                Move, resize and customize anything easily
                with our intuitive editor.
              </p>
            </div>

            {/* Row 2 - Span 2 (Right Side) */}
            <div className="bento-card bento-large span-2-right">
              <img
                src={Frame2}
                alt="Editor Preview"
                className="bento-image"
                onClick={goToSignin}
              />
            </div>

            {/* Row 1 - Span 2 */}
            <div className="bento-card bento-large span-2-left">
              <img
                src={Frame3}
                alt="Templates Preview"
                className="bento-image"
                onClick={goToSignin}
              />
            </div>

            {/* Row 1 - 1 Column */}
            <div className="bento-card bento-gradient-blue">
              <h3>Real Time Collaboration</h3>
              <p>
                Work together with your team, leave
                comments and edit simultaneously.
              </p>
            </div>

            {/* Row 2 - 1 Column */}
            <div className="bento-card bento-gradient-pink">
              <h3>Multiformat Export</h3>
              <p>
                Export the designs in your desired format wherever
                and whenever you want - Print ready formats available!
              </p>
            </div>

            {/* Row 2 - Span 2 (Right Side) */}
            <div className="bento-card bento-large span-2-right">
              <img
                src={Frame4}
                alt="Editor Preview"
                className="bento-image"
                onClick={goToSignin}
              />
            </div>

          </div>

      </div>
    </section>



    {/* Templates Carousel Section */}

    <section className="template-section">
      <h2 className="template-title">
        What do you want to <br /> create today?
      </h2>

      <div className="carousel">
          {images.map((img, index) => {
            const total = images.length;

            // Circular offset calculation
            let offset = index - activeIndex;

            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const absOffset = Math.abs(offset);

            // --- SIZE LAYERS ---
            let width = 457.85;
            let height = 340.89;
            let rotateY = 0;

            if (absOffset === 1) {
              width = 328;
              height = 244;
              rotateY = offset > 0 ? -25 : 25;
            }

            if (absOffset === 2) {
              width = 281;
              height = 209;
              rotateY = offset > 0 ? -35 : 35;
            }

            if (absOffset >= 3) {
              width = 213;
              height = 159;
              rotateY = offset > 0 ? -40 : 40;
            }

            const translateX = offset * 180;
            const zIndex = 100 - absOffset;

            return (
              <img
                  key={index}
                  src={img}
                  alt=""
                  className="carousel-image"
                  style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    transform: `
                      translateX(${translateX}px)
                      ${hoveredIndex === index ? "translateY(-15px)" : ""}
                      rotateY(${rotateY}deg)
                    `,
                    zIndex: zIndex,
                    opacity: absOffset > 4 ? 0 : 1,
                    filter: hoveredIndex === index ? "brightness(1.05)" : "brightness(1)"
                  }}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
            );
          })}
        </div>


      <button className="browse-btn" onClick={goToTemplates}>
        Browse all templates &rarr;
      </button>
    </section>



    {/* How It Works Section */}

    <section className="how-section">
      <h2 className="how-title">How it works</h2>

      <div className="how-container">
        {/* CARD 1 */}
        <div className="how-card">
          <div className="how-number">1</div>

          <div className="card-image">
            <img
              src={Edit1}
              alt="Choose template"
            />
          </div>

          <div className="card-content">
            <h3>Choose a template</h3>
            <p>Start with a layout made by professionals.</p>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="how-card">
          <div className="how-number">2</div>

          <div className="card-image">
            <img
              src={Edit2}
              alt="Customize"
            />
          </div>

          <div className="card-content">
            <h3>Customize it</h3>
            <p>Edit text, images, and styles in minutes.</p>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="how-card">
          <div className="how-number">3</div>

          <div className="card-image">
            <img
              src={Edit3}
              alt="Export"
            />
          </div>

          <div className="card-content">
            <h3>Export & share</h3>
            <p>Download or publish directly.</p>
          </div>
        </div>
      </div>
    </section>


    {/* Conversion Section */}

    <section className="hero">
      <div className="hero-container">

        {/* LEFT COLUMN */}
        <div className="hero-left">
          <h1>
            Ready to <span className="red-text">create</span><br />
            <span className="gradient-text">something</span> amazing?
          </h1>

          <button 
            className="hero-btn"
            onClick={goToSignin}
          >
            Get Started for Free
          </button>

          <p className="sub-text">
            No credit card required.
          </p>
        </div>

        {/* RIGHT COLUMN */}
        <div className="hero-right">
          <img src={paint_Img} alt="Design Palette" />
        </div>

      </div>
    </section>


    {/* Footer Section */}
    <Footer />
    </>
  );
}

export default Home;