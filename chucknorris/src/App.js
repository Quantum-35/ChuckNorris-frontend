import React from 'react';
import ApolloClient from   'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import 'antd/dist/antd.css';

import Routes from './container/routes';

const App = () => {
  const client = new ApolloClient({
    uri: "https://chucknorris-joke.herokuapp.com/graphql"
  });

  return(
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
