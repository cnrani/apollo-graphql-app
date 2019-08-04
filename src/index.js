import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';

import gql from 'graphql-tag';

import './index.css';

const GRAPHQL_PORT = process.env.REACT_APP_GRAPHQL_PORT || 3010;

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: `http://localhost:${GRAPHQL_PORT}/graphql`,
});


const Edit_CAR_ID_QUERY = gql` 

query EditCardId{       
  editCardId

  }
`;
const resolvers = {

  Query: {
    headerText: () => 'Car Tool',
    /*editCardId: (_1,_2,context) => {   // we want access to cache and do not want 1st and 2nd parameter

      const {cache} = context;
      const data = cache.readQuery({query: Edit_CAR_ID_QUERY});   // read thre graphql query. here we are working on cache not the client so we dont need @ client to the query above

      console.log(data);

      console.dir(context);
      return data.editCardId;
    },*/

  },

  Mutation: {   //create mutation to change carId

    setEditCarId: (_1, {carId}, {cache}) => {

      cache.writeData({
        data: {     //we need to have data property
          editCardId: carId,
        }
      });
    },
  },

};

cache.writeData({
  data: {     //we need to have data property
    editCardId: -1,
  }
});

const client = new ApolloClient({
  link, cache, resolvers,
  connectToDevTools: true,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
