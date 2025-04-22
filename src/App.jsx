import { useState, useEffect } from "react";
import "./App.css";
import React from "react";
import artwithmkLogo from "./Images/artwithmkLogo.png";
import artwork1 from "./Images/VinylSleeveMk.png";
import myGif from './Images/PNG-Tuber-GIF.gif';
import pricing from "./Images/artwithmkpricing.png";
import art0 from "./Images/artwithmk0.png";
import art1 from "./Images/artwithmk1.png";
import art2 from "./Images/artwithmk2.png";
import art3 from "./Images/artwithmk3.png";
import art4 from "./Images/artwithmk4.png";
import art5 from "./Images/artwithmk5.png";
import art6 from "./Images/artwithmk6.png";
import art7 from "./Images/artwithmk7.png";
import art8 from "./Images/artwithmk8.png";
import art9 from "./Images/artwithmk9.png";
import art10 from "./Images/artwithmk10.png";
import { FaInstagram, FaYoutube, FaEtsy } from "react-icons/fa";

const images = [art0, art1, art2, art3, art4, art5, art6, art7, art8, art9, art10];

function formatProductName(productKey) {
  const names = {
    profile: "Profile Picture",
    banner: "Banner",
    emotes1: "Emote (1)",
    emotes3: "Emotes (3)",
    emotes5: "Emotes (5)",
    poster: "Poster Illustration",
    charSketch: "Character Sketch",
    charColorSketch: "Character Colored Sketch",
    charIllustration: "Character Illustration"
  };
  return names[productKey] || productKey;
}

function App() {
  const [activePage, setActivePage] = useState("home");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([{ product: "" }]);
  const [selectedDate, setSelectedDate] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [breakdownText, setBreakdownText] = useState("");

  const today = new Date();
  const minDate = new Date(today.setDate(today.getDate() + 3)).toISOString().split('T')[0];

  const productBasePrices = {
    profile: { base: 30, perHour: 10, hours: 5 },
    banner: { base: 50, perHour: 10, hours: 5 },
    emotes1: { flat: 40 },
    emotes3: { flat: 110 },
    emotes5: { flat: 175 },
    poster: { base: 50, perHour: 10, hours: 5 },
    charSketch: { flat: 18 },
    charColorSketch: { flat: 28 },
    charIllustration: { base: 30, perHour: 10, hours: 5 },
  };

  function addProduct() {
    setSelectedProducts([...selectedProducts, { product: "" }]);
  }

  function removeProduct(index) {
    const updatedProducts = [...selectedProducts];
    updatedProducts.splice(index, 1);
    setSelectedProducts(updatedProducts);
    calculateEstimate(updatedProducts, selectedDate);
  }

  function handleProductChange(index, value) {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].product = value;
    setSelectedProducts(updatedProducts);
    calculateEstimate(updatedProducts, selectedDate);
  }

  function handleDateChange(e) {
    const date = e.target.value;
    setSelectedDate(date);
    calculateEstimate(selectedProducts, date);
  }

  function calculateEstimate(products, date) {
    if (!products.length || !date) {
      setEstimatedPrice(0);
      setBreakdownText("");
      return;
    }

    let total = 0;
    let breakdown = "";

    products.forEach(({ product }, idx) => {
      if (!product) return;
      const info = productBasePrices[product];
      if (info.flat) {
        total += info.flat;
        breakdown += `${idx + 1}. ${formatProductName(product)} - $${info.flat} flat\n`;
      } else if (info.base) {
        const subtotal = info.base + (info.perHour * info.hours);
        total += subtotal;
        breakdown += `${idx + 1}. ${formatProductName(product)} - $${info.base} base + ($${info.perHour}/hr × ${info.hours} hrs) = $${subtotal}\n`;
      }
    });

    const today = new Date();
    const deadline = new Date(date);
    const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

    if (diffDays >= 3 && diffDays <= 7) {
      total += 20;
      breakdown += `\nRush Fee (3–7 day delivery): +$20`;
    }

    setEstimatedPrice(total);
    setBreakdownText(breakdown);
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage !== null) {
        if (e.key === 'ArrowLeft') {
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'ArrowRight') {
          setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'Escape') {
          setSelectedImage(null);
          setSelectedIndex(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-pastel-yellow">
      <div className="containerTop"></div>
      <div className="containerTitle">
        <img src={artwithmkLogo} alt="Artwithmk Logo" className="logo" />
      </div>

      <div className="containerNavbar">
        <div className="nav-buttons">
          <button className="button" onClick={() => setActivePage("home")}>home</button>
          <button className="button" onClick={() => setActivePage("commission")}>commission</button>
          <button className="button" onClick={() => setActivePage("prices")}>prices</button>
          <button className="button" onClick={() => setActivePage("examples")}>gallery</button>
        </div>

        <div className="social-icons">
          <a href="https://www.instagram.com/artwithmk/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://www.youtube.com/@_artwithmk" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          <a href="https://artwithmk.etsy.com" target="_blank" rel="noopener noreferrer"><FaEtsy /></a>
        </div>
      </div>

      <div className={`containerFlex ${activePage ? "expanded" : ""}`}>
        {activePage === "home" && (
          <div className="home-content-wrapper">

            {/* TOP: Two Columns Side by Side */}
            <div className="home-container">

              {/* Left Column */}
              <div className="left-column">
                <h2> Mk <span className="arrow-icon">⤸</span></h2>
                <img src={myGif} alt="Animated GIF" className="gif-style" />
                <div className="left-column-facts">
                  <p>🎨 Digital Artist & Graphic Designer</p>
                  <p>💖 Loves all things pink and cute!</p>
                  <p>✨ Enjoys video games, anime, programming, <br /> and tennis!</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="info-container">
                <h2 className="welcome-title">Hi, I'm Mk! ✨</h2>
                <p>Welcome to artwithmk —<br />a cozy space for dreamy, custom digital art!</p>

                <div className="welcome-icons">
                  <div className="welcome-icon">🎨<br />Custom<br />Art</div>
                  <div className="welcome-icon">💬<br />Quick Responses</div>
                  <div className="welcome-icon">🌸<br />Made With Love</div>
                </div>

                <div className="explore-buttons">
                  <button onClick={() => setActivePage('commission')}>Commission Me ➔</button>
                  <button onClick={() => setActivePage('prices')}>View Pricing ➔</button>
                  <button onClick={() => setActivePage('examples')}>View Gallery ➔</button>
                </div>
              </div>

            </div> {/* END .home-container */}

            {/* BOTTOM: YouTube Feed BELOW the Columns */}
            <div className="youtube-feed">
              <h2 className="youtube-title">✨ Watch My YouTube Shorts ✨</h2>
              <div className="youtube-player-container">
                <iframe
                  width="250"
                  height="450"
                  src="https://www.youtube.com/embed/videoseries?list=PL2SY6o-D719Bv7C_bLuFxEj0b-GyyUesK"
                  title="YouTube Video Feed"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>


          </div> /* END home-content-wrapper */
        )}

        {activePage === "prices" && (
          <div className="content active prices-container">

            {/* NEW LINK TO ESTIMATOR */}
            <div className="jump-to-estimator">
              <a href="#commission-estimator">
                <span className="down-arrow">⌄</span> Click here to estimate your commission! <span className="down-arrow">⌄</span>
              </a>
            </div>


            <img src={pricing} alt="Prices" className="prices-image" />

            <div className="calendar-title-container" id="commission-estimator">
              <h2 className="commission-title">Estimate Your Commission! 🎨✨</h2>
            </div>

            <div className="commission-calendar-container">
              <div className="calendar-form">
                {selectedProducts.map((item, index) => (
                  <div key={index} className="product-selection" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <select
                      value={item.product}
                      onChange={(e) => handleProductChange(index, e.target.value)}
                    >
                      <option value="">-- Choose a Product --</option>
                      <option value="profile">Profile Picture</option>
                      <option value="banner">Banner</option>
                      <option value="emotes1">Emote (1)</option>
                      <option value="emotes3">Emotes (3)</option>
                      <option value="emotes5">Emotes (5)</option>
                      <option value="poster">Poster Illustration</option>
                      <option value="charSketch">Character Sketch</option>
                      <option value="charColorSketch">Character Colored Sketch</option>
                      <option value="charIllustration">Character Illustration</option>
                    </select>

                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeProduct(index)}
                    >
                      ❌
                    </button>
                  </div>
                ))}

                <button onClick={addProduct} className="add-button">+ Add Another Product</button>

                <label className="date-label">
                  Select<br></br>Deadline Date:
                  <input type="date" value={selectedDate} onChange={handleDateChange} min={minDate} />
                </label>

                <div className="estimated-price">
                  Estimated Total: ${estimatedPrice}
                </div>

                {breakdownText && (
                  <pre className="price-breakdown">{breakdownText}</pre>
                  
                )}
                {/* CTA to Commission Me */}
                <div className="cta-to-commission">
                  <button
                    className="commission-button bounce"
                    onClick={() => {
                      setActivePage("commission");
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }, 100);
                    }}
                  >
                    Ready to Commission Me? ➔
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


        {activePage === "examples" && (
          <div className="content active gallery-container">
            <h2>Gallery & Examples</h2>
            <div className="gallery-grid">
              {images.map((art, index) => (
                <img
                  key={index}
                  src={art}
                  alt={`Example ${index}`}
                  className="gallery-image"
                  onClick={() => {
                    setSelectedImage(art);
                    setSelectedIndex(index);
                  }}
                />
              ))}
            </div>

            {selectedImage && (
              <div className="popup-overlay" onClick={() => setSelectedImage(null)}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                  <button className="close-button" onClick={() => setSelectedImage(null)}>×</button>
                  <div className="popup-image-wrapper">
                    <img src={images[selectedIndex]} alt="Selected Art" className="popup-image" />
                    <div className="popup-arrows">
                      {selectedIndex > 0 && (
                        <button className="arrow-button" onClick={() => setSelectedIndex(prev => prev - 1)}>‹</button>
                      )}
                      {selectedIndex < images.length - 1 && (
                        <button className="arrow-button" onClick={() => setSelectedIndex(prev => prev + 1)}>›</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activePage === "commission" && (
          <div className="content active commission-container">
            <div id="commission-top"></div>
            <div className="commission-info">
              <h1>Commission Me!</h1>
              <p>
                Thinking about commissioning me? Please fill out the Google Form below and I'll reach out shortly. <br/><br/>
                Feel free to send me an email at <strong>artwithmk@hotmail.com</strong> or a message on Instagram <strong>@artwithmk</strong> for additional inquiries. <br/><br/>
                I am excited to make your artistic visions spring to life! – Mk
              </p>
            </div>

            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSf9B2w71TyLOJhmzjnO6PYGV1gbfVdk94e0i0u87QZD2tx8fg/viewform?embedded=true"
              width="100%"
              height="1900"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="Commission Form"
              className="commission-form"
            >
              Loading…
            </iframe>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
