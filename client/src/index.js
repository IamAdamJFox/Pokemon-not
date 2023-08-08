import React from "react";
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create an http link to your server
const httpLink = createHttpLink({
  uri: 'https://pokemon-not-bda447895737.herokuapp.com/graphql'
});

// Middleware to set the auth token for every request
const authLink = setContext((_, { headers }) => {
  // Get the token from local storage (or wherever you've stored it)
  const token = localStorage.getItem('id_token');
  
  // Attach it to headers
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

// Create the Apollo Client instance using the link with middleware and cache
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain the middleware link with the http link
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);