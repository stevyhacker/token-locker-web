import React, { useRef } from 'react';
import { useLocation, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views
import Home from './views/Home';


import { Body, Button, Header, Image, Link } from "./components";
import logo from "./ethereumLogo.png";

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};


function App() {

  const childRef = useRef();
  let location = useLocation();

  React.useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <div>
      <Body>
        <ScrollReveal
          ref={childRef}
          children={() => (
            <Switch>
              <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
            </Switch>
          )} />
      </Body>
    </div>

  );
}

export default App;
