import React, {useEffect, useRef} from 'react';
import {useLocation, BrowserRouter} from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views
import Home from './views/Home';
import Roadmap from "./views/Roadmap";
import Contact from "./views/Contact";
import About from "./views/About";

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE,
  {testMode: process.env.NODE_ENV === 'test'});

const trackPage = page => {
  ReactGA.set({page});
  ReactGA.pageview(page);
};

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Futura',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  },
  palette: {
    type: 'dark',
    primary: blue
  }
});

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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
