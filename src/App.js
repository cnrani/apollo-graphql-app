import * as React from 'react';

import {ApolloProvider, Query, Mutation} from 'react-apollo';


import {CarForm} from './components/CarForm';


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


const APPEND_CAR_MUTATION = gql`

mutation AppendCar($car: AppendCar) {
    appendCar(car: $car) {
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

    return <>
      <Query query={APP_QUERY}>{
        ({data, loading, error}) => {


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
      <Mutation mutation={APPEND_CAR_MUTATION}>{(mutate) => {  // use Mutation to update store data or use Query to fetch data
        const appendCar = car => {
          mutate({
            variables: {car},
            optimisticResponse: {   //optimistic response is fake response to update UI before updating with real response
              appendCar: {
                id: -1,
                ...car,
                __typename: 'Car',
              },
            },
            update: (store, {data: {appendCar: car}}) => {   //response will get updated to store

              const data = store.readQuery({query: APP_QUERY});  //fetches the car and updates data
              data.cars = data.cars.concat(car);  //concat the cars data
              store.writeQuery({query: APP_QUERY, data}); // writeQuery updates the store with cars
            },
          });
        };
        return <CarForm buttonText="Add Car" onSubmitCar={appendCar}/>;
      }}</Mutation>
  </>;
  }
}
