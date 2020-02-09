import React from 'react';
import Logo from '../../assets/img/logo.png';

const HeroImg = () => {
  return (
    <div className="hero-img">
      <img className="text-center" src={Logo} alt="" />
    </div>
  );
};

export default HeroImg;