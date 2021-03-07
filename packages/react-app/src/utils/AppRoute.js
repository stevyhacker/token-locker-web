import React from 'react';
import {Route} from 'react-router-dom';

function AppRoute(
  {
    component: Component,
    layout: Layout,
    ...rest
  }) {

  Layout = (Layout === undefined) ? props => (<>{props.children}</>) : Layout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}/>
  );
}

export default AppRoute;
