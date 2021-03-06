import React from 'react';
// import sections
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Cta from '../components/sections/Cta';
import RoadmapFeatures from '../components/sections/RoadmapFeatures';

function Roadmap() {

  return (
    <div>
      <RoadmapFeatures/>
      <Cta split/>
    </div>
  );
}

export default Roadmap;
