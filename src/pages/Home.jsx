// Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import images from "../assets/images";
import styles from "./Mainstyles.module.css";

const Home = () => {
  const navigate = useNavigate();

  const handleSelect = (id) => {
    navigate(`/customize/${id}`);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: "0",
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          centerPadding: "0",
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "0",
        }
      }
    ]
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎉 اختر بطاقة التهنئة</h1>
      <div className={styles.sliderWrapper}>
        <Slider {...sliderSettings} className={styles.slider}>
          {images.map((img, index) => (
            <div 
              key={index} 
              className={styles.cardContainer}
              onClick={() => handleSelect(index)}
            >
              <div className={styles.card}>
                <div className={styles.cardGlow} />
                <img 
                  src={img} 
                  alt={`Card ${index}`} 
                  className={styles.image} 
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;