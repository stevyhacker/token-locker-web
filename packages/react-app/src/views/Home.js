import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Cta from '../components/sections/Cta';

const Home = () => {

  return (
    <div>
      <Hero className="illustration-section-01" />
      <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />
      <Cta split />
    </div>
  );
}

export default Home;
