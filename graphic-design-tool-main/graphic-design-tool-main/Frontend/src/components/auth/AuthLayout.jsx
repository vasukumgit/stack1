import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Auth.css";
import PeopleIcon from "../../assets/Svg/PeapleIcon.svg";

const AuthLayout = ({ children }) => {
  const [active, setActive] = useState(0);

  const slides = [
    {
      type: "double",
      main: "/src/assets/Image Container.jpg",
      secondary: "/src/assets/Image Container (1).jpg",
    },

    {
      type: "single",
      main: "/src/assets/placeholder 2 2.jpg",
    },
    {
      type: "single",
      main: "/src/assets/placeholder-container.jpg",
    },
    
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="auth-page">
      <div className="auth-top">
        <Link to="/" className="auth-logo">
          <span className="logo-box">A</span>
          <span className="logo-text">Stackly-Tool</span>
        </Link>
      </div>

      <div className="auth-content">
        <div className="auth-left">{children}</div>

        <div className="auth-right">
          <div className="design-carousel">

            {slides.map((slide, index) => (
              <div
                key={index}
                className={`design-slide ${
                  index === active ? "active-slide" : ""
                }`}
              >
                {slide.type === "double" ? (
                  <>
                    <div className="canvas-item main">
                      <img src={slide.main} alt="main" />
                    </div>

                    <div className="canvas-item-secondary secondary">
                      <img src={slide.secondary} alt="secondary" />
                    </div>
                  </>
                ) : (
                  <div className="single-image">
                    <img src={slide.main} alt="single" />
                  </div>
                )}

                <div className="collab-tooltip">
                  <div className="collab-icon"><img src={PeopleIcon} alt="People Icon" />
</div>
                  <p>
                    Collaboration made easier,<br />
                    Design simultaneously with your team now!
                  </p>
                </div>
              </div>
            ))}

            {/* Dots */}
            <div className="carousel-dots">
              {slides.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${
                    index === active ? "active-dot" : ""
                  }`}
                  onClick={() => setActive(index)}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
