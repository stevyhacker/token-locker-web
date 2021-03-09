import React, {useEffect, useRef} from 'react';
import {useLocation, BrowserRouter} from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views
import Home from './views/Home';


import Roadmap from "./views/Roadmap";
import Contact from "./views/Contact";
import About from "./views/About";

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = page => {
  ReactGA.set({page});
  ReactGA.pageview(page);
};

function App() {

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <BrowserRouter>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault}/>
          <AppRoute exact path="/roadmap" component={Roadmap} layout={LayoutDefault}/>
          <AppRoute exact path="/about" component={About} layout={LayoutDefault}/>
          <AppRoute exact path="/contact" component={Contact} layout={LayoutDefault}/>
        </BrowserRouter>
      )}/>
  );
}

export default App;
