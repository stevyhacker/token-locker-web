import React from 'react';
// import sections
import CtaDonate from '../components/sections/CtaDonate';
import RoadmapFeatures from '../components/sections/RoadmapFeatures';

function Roadmap() {

  return (
    <div>
      <RoadmapFeatures/>
      <CtaDonate split/>
    </div>
  );
}

export default Roadmap;
