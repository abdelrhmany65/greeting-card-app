import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import images from "../assets/images";
import styles from "./Customize.module.css";

const Customize = () => {
  const { id } = useParams();
  const [userName, setUserName] = useState("");
  const [arabicError, setArabicError] = useState(false);
  const [lengthError, setLengthError] = useState(false);
  const cardRef = useRef(null);
  const MAX_NAME_LENGTH = 15;

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
  
    if (inputValue === "") {
      setUserName("");
      setArabicError(false);
      setLengthError(false);
      return;
    }

    // التحقق من الأحرف العربية فقط
    const arabicRegex = /^[\u0600-\u06FF\s]+$/;
    const isValid = arabicRegex.test(inputValue);
    setArabicError(!isValid);

    // التحقق من الحد الأقصى للحروف
    const isWithinLimit = inputValue.length <= MAX_NAME_LENGTH;
    setLengthError(!isWithinLimit);

    // تحديث القيمة مع تطبيق القيود
    if (isValid && isWithinLimit) {
      setUserName(inputValue);
    }
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
        <p className={styles.userName}>{userName}</p>
      </div>
      <input
        type="text"
        placeholder="اكتب اسمك هنا"
        className={styles.input}
        value={userName}
        onChange={handleInputChange}
        maxLength={MAX_NAME_LENGTH}
      />
      <div className={styles.errorContainer}>
        {arabicError && (
          <p className={styles.error}>يُرجى استخدام الأحرف العربية فقط</p>
        )}
        {lengthError && (
          <p className={styles.error}>الحد الأقصى لعدد الأحرف هو {MAX_NAME_LENGTH}</p>
        )}
      </div>
      <button onClick={handleDownload} className={styles.downloadButton}>
        تحميل البطاقة
      </button>
    </div>
  );
};

export default Customize;
