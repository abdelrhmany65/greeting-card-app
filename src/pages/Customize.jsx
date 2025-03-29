import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import images from "../assets/images";
import styles from "./Customize.module.css";

const Customize = () => {
  const { id } = useParams();
  const [userName, setUserName] = useState("");
  const cardRef = useRef(null);
  const MAX_NAME_LENGTH = 15;

  // استخدم وحدات نسبية (rem) لضبط حجم الخط ليكون متجاوبًا مع حجم الشاشة
  const styleMapping = {
    0: { 
      color: "#188896", 
      bottom: "30%", 
      left: "67%", 
      transform: "translateX(-50%)",
      fontSize: "0.6rem",
      fontFamily: "'Thuluth', 'Traditional Arabic', sans-serif"
    },
    1: { 
      color: "#A8292A", 
      bottom: "14%", 
      left: "38%", 
      transform: "translateX(-50%)",
      fontSize: "0.6rem",
      fontFamily: "'Thuluth', 'Traditional Arabic', sans-serif"
    },
    2: { 
      color: "#ED8EA6", 
      bottom: "16%", 
      left: "50%", 
      transform: "translateX(-50%)",
      fontSize: "0.6rem",
      fontFamily: "'Courier New', Courier, monospace"
    },
    3: { 
      color: "#333", 
      bottom: "25px", 
      left: "50%", 
      transform: "translateX(-50%)",
      fontSize: "0.6rem",
      fontFamily: "'Amiri', 'Traditional Arabic', sans-serif"
    },
    4: { 
      color: "#fff", 
      bottom: "15%", 
      left: "50%", 
      transform: "translateX(-50%)",
      fontSize: "0.6rem",
      fontFamily: "'Thuluth', 'Traditional Arabic', sans-serif"
    },
  };

  const cardStyle = styleMapping[id] || {};

  const handleInputChange = (e) => {
    setUserName(e.target.value);
  };

  const handleDownload = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current, { backgroundColor: null }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "greeting-card.png";
        link.click();
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>💖 أنشئ بطاقتك المميزة في لحظات</h1>
      <div className={styles.cardPreview} ref={cardRef}>
        <img src={images[id]} alt="Selected Card" className={styles.image} />
        <p style={cardStyle} className={styles.userName}>
          {userName}
        </p>
      </div>
      <input
        type="text"
        placeholder="اكتب اسمك هنا"
        className={styles.input}
        value={userName}
        onChange={handleInputChange}
        maxLength={MAX_NAME_LENGTH}
      />
      <button onClick={handleDownload} className={styles.downloadButton}>
        تحميل البطاقة
      </button>
    </div>
  );
};

export default Customize;
