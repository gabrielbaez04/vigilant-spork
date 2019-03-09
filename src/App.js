import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import "./App.css";
import Home from "./components/TastingSession/Home";

import resolvers from "./graphql/resolvers";
import initialState from "./graphql/initialState";

const client = new ApolloClient({
  uri: "http://localhost:4466",
  clientState: {
    defaults: initialState,
    resolvers,
  },
});
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Home />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
