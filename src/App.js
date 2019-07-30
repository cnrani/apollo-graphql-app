import * as React from 'react';

import {ApolloProvider, Query} from 'react-apollo';
import gql from 'graphql-tag';
import {CarTable} from './components/CarTable';

const APP_QUERY = gql`
  query AppQuery {
    cars {
      id
      make
      model
      year
      color
      price
   }
  }
`;

export class App extends React.Component {

  render() {

    return <Query query={APP_QUERY}>{
      ({ data, loading, error }) => {


        if (loading) {
          return <div>Loading...</div>;
        }

        if (error) {
          return <div>Error: {error.message}</div>;
        }


        //return <div>Number of Cars: {data.cars.length}</div>;

        return <CarTable cars={data.cars}/>;


      }
    }</Query>;

  }
}
