import React from 'react';
import Logo from '../../assets/img/logo.jpg';

const HeroImg = () => {
  return (
    <div className="hero-img">
      <img className="text-center" src={Logo} alt="Kanskje Kommer Kongen" />
    </div>
  );
};

export default HeroImg;