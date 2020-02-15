import React from 'react';
import HeroImg from '../components/HeroImg/HeroImg';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  const history = useHistory();
  return (
    <div className="container HomePage">
      {/* <h1 className="title">Lambertrevyen 2020</h1> */}
      <HeroImg />
      <div className="text-center mx-auto">
        <h2>Premiere 27. feb | Forestillinger fra 28. feb - 5. mars </h2>
        <button className="button primary" onClick={() => history.push('/bestill')}>
          Bestill nå
        </button>
      </div>
    </div>
  );
};

export default HomePage;
