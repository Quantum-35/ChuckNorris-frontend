import React from 'react';
import { ApolloClient, InMemoryCache, ApolloLink } from   'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { persistCache } from 'apollo-cache-persist';
import { createHttpLink } from 'apollo-link-http';

import 'antd/dist/antd.css';
import './App.css'

import Routes from './container/routes';

const App = () => {
  const cache = new InMemoryCache();
  const uri = process.env.REACT_APP_BASE_URL;
  
  persistCache({
    cache,
    storage: localStorage
  });
  
  if (localStorage['apollo-cache-persist']) {
    let cacheData = JSON.parse(localStorage['apollo-cache-persist'])
    cache.restore(cacheData)
  }
  
  const httpLink = createHttpLink({
    uri
  });

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext((context) => ({
      headers: {
        ...context.headers,
        authorization: localStorage.getItem('token')
      }
    }));
    return forward(operation);
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache
  });

  return(
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
