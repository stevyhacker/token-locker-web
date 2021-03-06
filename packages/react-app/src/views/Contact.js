import React from 'react';
// import sections
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Cta from '../components/sections/Cta';

function Contact() {

  return (
    <div>
      <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02"/>
      <Cta split/>
    </div>
  );
}

export default Contact;
