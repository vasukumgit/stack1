import { useState, useRef , useEffect  } from "react";
import "./Dashboard.css";
import {
  FiFolder,
  FiPlus,
  FiSearch,
  FiBell,
  FiImage,
  FiTrash2,
  FiHome,
  FiGrid,
  FiFileText,
  FiUser,
  FiSettings,
  FiLogOut,
  FiMail,
  FiPhone,
  FiStar,
  FiList,
  FiFolderPlus
} from "react-icons/fi";
import { Crown, Layout, Layers ,CreditCard, Presentation, Plus, Trash2, Grid, List, Folder   } from "lucide-react";

// Search Customs
import Poster from "../../assets/Search-Images/Poster.jpg"
import Business_cars from "../../assets/Search-Images/Business_cars.jpg"
import PresentationSearch from "../../assets/Search-Images/Presentation.jpg"
import Custom from "../../assets/Search-Images/Custom.jpg"
import Wedding from "../../assets/Search-Images/Wedding.jpg"
import Happy_Birthday from "../../assets/Search-Images/Happy_Birthday.jpg"
import Business from "../../assets/Search-Images/Business.jpg"
import Resume from "../../assets/Search-Images/Resume.jpg"

const suggestedSizes = [
  { name: "Poster", image: Poster},
  { name: "Business Cars", image: Business_cars },
  { name: "Presentation", image: PresentationSearch},
  { name: "Custom", image: Custom },
];

const recomendedSearches = [
  { name: "Wedding", image: Wedding},
  { name: "Happy_Birthday", image: Happy_Birthday },
  { name: "Business", image: Business},
  { name: "Resume", image: Resume },
];

function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("home");
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  // Quick actions styles
  const [clickedBtn, setClickedBtn] = useState(null);
  const handleClick = (type) => {
    setClickedBtn(type);
    
    setTimeout(() => {
      setClickedBtn(null);
    }, 1000); // 1 seconds
  };
  
  // project Serach
  const [showProjectSearch, setShowProjectSearch] = useState(false);
  // project actions
  const [activeTab, setActiveTab] = useState("Projects");

  // Generate consistent user data based on avatar (lazy initialization)
  const [userData] = useState(() => {
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa', 'James', 'Maria'];
    const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez'];

    const randomIndex = Math.floor(Math.random() * firstNames.length);
    const firstName = firstNames[randomIndex];
    const lastName = lastNames[randomIndex];

    return {
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `+1 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`
    };
  });

  const searchRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearchDropdown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <div className="dashboard">

      {/* ================= TOP HEADER ================= */}
      <header className="topbar">
        <div className="top-left">
          <div className="logo-box">A</div>
          <h3>App Name</h3>
        </div>

        <div className="top-actions">
          <button className="create-btn">
            <FiPlus /> Create New Design
          </button>

          <button
            className="upgrade-btn"
            onClick={() => setShowPricing(true)}
          >
            <Crown size={24} color="#facc15" />
            Upgrade Plan
          </button>
        </div>
      </header>


      {/* ================= BODY ================= */}
      <div className="dashboard-body">

        {/* ============ SIDEBAR (HEADER KINDA) ============ */}
        <aside className="sidebar">

          <div className="sidebar-top">
            <div
              className="avatar"
              onClick={() => setShowProfile(!showProfile)}
            ></div>

            <FiBell
              className="bell-icon"
              onClick={() => setShowNotification(!showNotification)}
            />
          </div>

          <nav className="sidebar-menu">

            <div
              className={`menu-item ${activeMenu === "home" ? "active" : ""}`}
              onClick={() => setActiveMenu("home")}
            >
              <FiHome />
              <span>Home</span>
            </div>

            <div
              className={`menu-item ${activeMenu === "template" ? "active" : ""}`}
              onClick={() => setActiveMenu("template")}
            >
              <FiImage />
              <span>Template</span>
            </div>

            <div
              className={`menu-item ${activeMenu === "projects" ? "active" : ""}`}
              onClick={() => setActiveMenu("projects")}
            >
              <FiFolder />
              <span>Projects</span>
            </div>

            

          </nav>

          <div className="sidebar-bottom">
            <FiTrash2 />
          </div>

        </aside>


        {/* ============ MAIN CONTENT ============ */}
        <div className="content">
          {activeMenu === "home" && (
            <div className="dashboard-wrapper">
              <h1 className="dashboard-title">
                What would you like to <span>create</span> today?
              </h1>

              <div className={`search-wrapper ${showSearchDropdown ? "active" : ""}`} ref={searchRef}>
                        <div
                              className="search-box"
                              onClick={() => setShowSearchDropdown(true)}
                            >
                              <div className="search-icon">
                                <FiSearch />
                              </div>

                              <input
                                type="text"
                                placeholder="Search templates, sizes, or projects..."
                                onFocus={() => setShowSearchDropdown(true)}
                              />
                            </div>

                        {showSearchDropdown && (
                          <div className="search-dropdown">
                            <div className="search-links">
                              <div className="search-link"><span>In</span> Search within folders or teams</div>
                              <div className="search-link"><span>By</span> Search by owner</div>
                              <div className="search-link"><span>Type</span> Filter by file type</div>
                              <div className="search-link"><span>Category</span> Filter by content category</div>
                            </div>

                            <h4>Suggested Sizes</h4>
                            <div className="suggested-grid">
                              {suggestedSizes.map((item) => (
                                <div className="suggest-card" key={item.name}>
                                  <img src={item.image} alt={item.name} />
                                  <span>{item.name}</span>
                                </div>
                              ))}
                            </div>

                            <h4>Recommended Searches</h4>
                            <div className="suggested-grid">
                              {recomendedSearches.map((item) => (
                                <div className="suggest-card" key={item.name}>
                                  <img src={item.image} alt={item.name} />
                                  <span>{item.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

              <div className="quick-actions">
                <h4>Quick actions</h4>

             <div className="action-buttons">
                <button className={`action-btn ${clickedBtn === "Poster" ? "clicked" : ""}`}
                onClick={() => handleClick("Poster")}>

                  <div className="left icon-business">
                    <Layers size={18} />
                  </div>
                  <div className="right">
                    <span>Poster</span>
                  </div>
                </button>

                <button className={`action-btn ${clickedBtn === "Business Card" ? "clicked" : ""}`}
                onClick={() => handleClick("Business Card")}>
                  <div className="left icon-card">
                    <CreditCard size={18} />
                  </div>
                  <div className="right">
                    <span>Business Card</span>
                  </div>
                </button>

                <button className={`action-btn ${clickedBtn === "Presentation" ? "clicked" : ""}`}
                onClick={() => handleClick("Presentation")}>
                  <div className="left icon-presentation">
                    <Presentation size={18} />
                  </div>
                  <div className="right">
                    <span>Presentation</span>
                  </div>
                </button>

                <button className={`action-btn ${clickedBtn === "Custom Size" ? "clicked" : ""}`}
                onClick={() => handleClick("Custom Size")}>
                  <div className="left icon-custom">
                    <Plus size={18} />
                  </div>
                  <div className="right">
                    <span>Custom Size</span>
                  </div>
                </button>
              </div>
              </div>

              <div className="recents">
                <h4>Recents</h4>

                <div className="recent-card">
                  <p>No recent files</p>
                  <span>Files you save or create will appear here</span> <br></br>
                  <button className="recent-create">
                    <FiPlus /> Create new
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeMenu === "template" && (
            <div className="dashboard-wrapper">
              <h1 className="dashboard-title">
                Explore <span>Templates</span>
              </h1>

              <div
                    className={`templates-search-wrapper ${showProjectSearch ? "active" : ""}`}
                  >
                    <div
                      className="templates-search-box"
                      onClick={() => setShowProjectSearch(true)}
                    >
                      <div className="search-icon">
                        <FiSearch />
                      </div>

                      {showProjectSearch && (
                        <span className="search-tag">In Templates</span>
                      )}

                      <input
                        type="text"
                        placeholder="Search Templates..."
                        onFocus={() => setShowProjectSearch(true)}
                        onBlur={() => setShowProjectSearch(false)}
                      />
                    </div>
                  </div>

              <div className="quick-actions">
                <h4>Create Design</h4>
                    <button className={`action-btn ${clickedBtn === "Poster" ? "clicked" : ""}`}
                onClick={() => handleClick("Poster")}>

                  <div className="left icon-business">
                    <Layers size={18} />
                  </div>
                  <div className="right">
                    <span>Poster</span>
                  </div>
                </button>

                <button className={`action-btn ${clickedBtn === "Business Card" ? "clicked" : ""}`}
                onClick={() => handleClick("Business Card")}>
                  <div className="left icon-card">
                    <CreditCard size={18} />
                  </div>
                  <div className="right">
                    <span>Business Card</span>
                  </div>
                </button>

                <button className={`action-btn ${clickedBtn === "Presentation" ? "clicked" : ""}`}
                onClick={() => handleClick("Presentation")}>
                  <div className="left icon-presentation">
                    <Presentation size={18} />
                  </div>
                  <div className="right">
                    <span>Presentation</span>
                  </div>
                </button>

                <button className={`action-btn ${clickedBtn === "Custom Size" ? "clicked" : ""}`}
                onClick={() => handleClick("Custom Size")}>
                  <div className="left icon-custom">
                    <Plus size={18} />
                  </div>
                  <div className="right">
                    <span>Custom Size</span>
                  </div>
                </button>
              </div>

              <div className="recents">
                <h4>Featured Templates</h4>

                <div className="recent-card">
                  <p>Coming Soon</p>
                  <span>Browse our collection of professionally designed templates</span>
                </div>
              </div>
            </div>
          )}

          {activeMenu === "projects" && (
            <div className="dashboard-wrapper">
              <h1 className="dashboard-title">
                Your <span>Studio!</span>
              </h1>

              <div
                    className={`projects-search-wrapper ${showProjectSearch ? "active" : ""}`}
                  >
                    <div
                      className="projects-search-box"
                      onClick={() => setShowProjectSearch(true)}
                    >
                      <div className="search-icon">
                        <FiSearch />
                      </div>

                      {showProjectSearch && (
                        <span className="search-tag">In Projects</span>
                      )}

                      <input
                        type="text"
                        placeholder="Search Projects..."
                        onFocus={() => setShowProjectSearch(true)}
                        onBlur={() => setShowProjectSearch(false)}
                      />
                    </div>
                  </div>

              <div className="workspace-header">
                <h3 className="workspace-title">My Workspace</h3>

                <div className="workspace-topbar">

                  {/* LEFT SIDE - FILTER BUTTONS */}
                  <div className="workspace-filters">
                    <button 
                      className={activeTab === "Projects" ? "filter-btn active" : "filter-btn"}
                      onClick={() => setActiveTab("Projects")}
                    >
                      <FiFolder size={18} />
                      Projects
                    </button>

                    <button 
                      className={activeTab === "Folders" ? "filter-btn active" : "filter-btn"}
                      onClick={() => setActiveTab("Folders")}
                    >
                      <FiFolderPlus size={18} />
                      Folders
                    </button>

                    <button 
                      className={activeTab === "Starred" ? "filter-btn active" : "filter-btn"}
                      onClick={() => setActiveTab("Starred")}
                    >
                      <FiStar size={18} />
                      Starred
                    </button>

                    <button 
                      className={activeTab === "Trash" ? "filter-btn active" : "filter-btn"}
                      onClick={() => setActiveTab("Trash")}
                    >
                      <FiTrash2 size={18} />
                      Trash
                    </button>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="workspace-actions">
                    <button className="new-project-btn">
                      <FiPlus size={18} />
                      New Project
                    </button>

                    <FiGrid size={20} className="view-icon" />
                    <FiList size={20} className="view-icon" />
                  </div>

                </div>
              </div>

              <div className="recents">
                <h4>Your Projects</h4>

                <div className="recent-card">
                  <p>No projects yet</p>
                  <span>Create your first design to get started</span> <br></br>
                  <button className="recent-create">
                    <FiPlus /> Create new project
                  </button>
                </div>
              </div>
            </div>
          )}

                    {activeMenu === "notifications" && (
            <div className="dashboard-wrapper">
              <h1 className="dashboard-title">
                <span>Notifications</span>
              </h1>

              <div className="notifications-list">
                <div className="notification-item unread">
                  <div className="notification-icon">
                    <FiPlus />
                  </div>
                  <div className="notification-content">
                    <h4>New template available</h4>
                    <p>Check out our latest business card templates</p>
                    <span className="notification-time">2 minutes ago</span>
                  </div>
                </div>

                <div className="notification-item unread">
                  <div className="notification-icon">
                    <FiFolder />
                  </div>
                  <div className="notification-content">
                    <h4>Project shared with you</h4>
                    <p>John shared "Marketing Campaign" with you</p>
                    <span className="notification-time">1 hour ago</span>
                  </div>
                </div>

                <div className="notification-item">
                  <div className="notification-icon">
                    <FiBell />
                  </div>
                  <div className="notification-content">
                    <h4>Design completed</h4>
                    <p>Your "Summer Sale" poster is ready for review</p>
                    <span className="notification-time">3 hours ago</span>
                  </div>
                </div>

                <div className="notification-item">
                  <div className="notification-icon">
                    <FiImage />
                  </div>
                  <div className="notification-content">
                    <h4>Template updated</h4>
                    <p>"Social Media Pack" has been updated with new designs</p>
                    <span className="notification-time">Yesterday</span>
                  </div>
                </div>

                <div className="notification-item">
                  <div className="notification-icon">
                    <FiFileText />
                  </div>
                  <div className="notification-content">
                    <h4>System update</h4>
                    <p>New features available in your dashboard</p>
                    <span className="notification-time">2 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showNotification && (
            <div className="notification-overlay">
              <div className="notification-overlay-content">
                <div className="notification-overlay-header">
                  <h3>Notifications</h3>
                  <button
                    className="close-btn"
                    onClick={() => setShowNotification(false)}
                  >
                    ✕
                  </button>
                </div>

                <div className="notifications-list">
                  <div className="notification-item unread">
                    <div className="notification-icon">
                      <FiPlus />
                    </div>
                    <div className="notification-content">
                      <h4>New template available</h4>
                      <p>Check out our latest business card templates</p>
                      <span className="notification-time">2 minutes ago</span>
                    </div>
                  </div>

                  <div className="notification-item unread">
                    <div className="notification-icon">
                      <FiFolder />
                    </div>
                    <div className="notification-content">
                      <h4>Project shared with you</h4>
                      <p>John shared "Marketing Campaign" with you</p>
                      <span className="notification-time">1 hour ago</span>
                    </div>
                  </div>

                  <div className="notification-item">
                    <div className="notification-icon">
                      <FiBell />
                    </div>
                    <div className="notification-content">
                      <h4>Design completed</h4>
                      <p>Your "Summer Sale" poster is ready for review</p>
                      <span className="notification-time">3 hours ago</span>
                    </div>
                  </div>

                  <div className="notification-item">
                    <div className="notification-icon">
                      <FiImage />
                    </div>
                    <div className="notification-content">
                      <h4>Template updated</h4>
                      <p>"Social Media Pack" has been updated with new designs</p>
                      <span className="notification-time">Yesterday</span>
                    </div>
                  </div>

                  <div className="notification-item">
                    <div className="notification-icon">
                      <FiFileText />
                    </div>
                    <div className="notification-content">
                      <h4>System update</h4>
                      <p>New features available in your dashboard</p>
                      <span className="notification-time">2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showProfile && (
            <div className="profile-overlay">
              <div className="profile-overlay-content">
                <div className="profile-overlay-header">
                  <h3>Profile</h3>
                  <button
                    className="close-btn"
                    onClick={() => setShowProfile(false)}
                  >
                    ✕
                  </button>
                </div>

                <div className="profile-info">
                  <div className="profile-avatar-large">
                    <div className="avatar"></div>
                  </div>
                  <h2>{userData.name}</h2>
                  <p>{userData.email}</p>
                </div>

                <div className="profile-details">
                  <div className="detail-item">
                    <FiMail />
                    <span>{userData.email}</span>
                  </div>
                  <div className="detail-item">
                    <FiPhone />
                    <span>{userData.phone}</span>
                  </div>
                </div>

                <div className="profile-actions">
                  <button className="profile-action-btn">
                    <FiSettings />
                    <span>Settings</span>
                  </button>
                  <button className="profile-action-btn logout">
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {showPricing && (
            <div className="pricing-overlay">
              <div className="pricing-overlay-content">
                <div className="pricing-overlay-header">
                  <h3>Upgrade Your Plan</h3>
                  <button
                    className="close-btn"
                    onClick={() => setShowPricing(false)}
                  >
                    ✕
                  </button>
                </div>

                <div className="pricing-plans">
                  <div className="pricing-plan basic">
                    <div className="plan-header">
                      <h4>Basic</h4>
                      <div className="plan-price">
                        <span className="currency">$</span>
                        <span className="amount">9</span>
                        <span className="period">/month</span>
                      </div>
                    </div>
                    <ul className="plan-features">
                      <li>✓ 5 Projects</li>
                      <li>✓ Basic Templates</li>
                      <li>✓ 1GB Storage</li>
                      <li>✓ Email Support</li>
                    </ul>
                    <button className="plan-btn">Choose Basic</button>
                  </div>

                  <div className="pricing-plan pro featured">
                    <div className="plan-badge">Most Popular</div>
                    <div className="plan-header">
                      <h4>Pro</h4>
                      <div className="plan-price">
                        <span className="currency">$</span>
                        <span className="amount">29</span>
                        <span className="period">/month</span>
                      </div>
                    </div>
                    <ul className="plan-features">
                      <li>✓ Unlimited Projects</li>
                      <li>✓ Premium Templates</li>
                      <li>✓ 10GB Storage</li>
                      <li>✓ Priority Support</li>
                      <li>✓ Custom Branding</li>
                    </ul>
                    <button className="plan-btn primary">Choose Pro</button>
                  </div>

                  <div className="pricing-plan enterprise">
                    <div className="plan-header">
                      <h4>Enterprise</h4>
                      <div className="plan-price">
                        <span className="currency">$</span>
                        <span className="amount">99</span>
                        <span className="period">/month</span>
                      </div>
                    </div>
                    <ul className="plan-features">
                      <li>✓ Everything in Pro</li>
                      <li>✓ Unlimited Storage</li>
                      <li>✓ 24/7 Support</li>
                      <li>✓ Team Collaboration</li>
                      <li>✓ API Access</li>
                    </ul>
                    <button className="plan-btn">Contact Sales</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;