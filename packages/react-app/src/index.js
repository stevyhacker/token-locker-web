import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "@apollo/react-hooks";
import {Router} from "react-router-dom";
import {createBrowserHistory} from "history";
// import "./index.css";
import App from "./App";
import * as serviceWorker from './serviceWorker';
import './assets/scss/style.scss';

//TODO You should replace this url with your own and put it into a .env file
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/paulrberg/create-eth-app",
});

const history = createBrowserHistory();

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history}>
      <App/>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
