import * as React from 'react';

import {ApolloProvider, Query, Mutation} from 'react-apollo';


import {CarForm} from './components/CarForm';


import gql from 'graphql-tag';
import {CarTable} from './components/CarTable';

const APP_QUERY = gql`
  query AppQuery {
    headerText @client
    editCardId @client
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


const UPDATE_CAR_MUTATION = gql`

mutation ReplaceCar($car: ReplaceCar) {
    replaceCar(car: $car) {
      id
      make
      model
      year
      color
      price
   }
   setEditCarId(carId: -1) @client
  }

`;


const SET_EDIT_CAR_ID_MUTATION = gql`

mutation SetEditCarId($carId: ID) {
    setEditCarId(carId: $carId) @client{
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

      <Mutation mutation={SET_EDIT_CAR_ID_MUTATION}>
        {(mutateSetEditCarId) => {

          const editCar = carId => {
            mutateSetEditCarId({

              variables: {carId}
            });
          };

          return <Mutation mutation={UPDATE_CAR_MUTATION}>{(mutate) => {  // use Mutation to update store data or use Query to fetch data.. server operation to add to the collection of cars to the server
            const replaceCar = car => {
              mutate({
                variables: {car},
                optimisticResponse: {   //optimistic response is fake response to update UI before updating with real response
                  replaceCar: {
                    id: car.id,
                    ...car,
                    __typename: 'Car',
                  },
                },
                update: (store, {data: {replaceCar: car}}) => {   //response will get updated to store

                  const data = store.readQuery({query: APP_QUERY});  //fetches the car from cache and updates data
                  data.cars = data.cars.map(c => {
                    if(c.id===car.id) {
                      return car;
                    }
                    else {
                      return c;
                    }
                  });  //concat the cars data
                  store.writeQuery({query: APP_QUERY, data}); // writeQuery updates the store with cars
                },
              });
            };
            // return <CarForm buttonText="Add Car"  onSubmitCar={updateCar}/>;

            return <Query query={APP_QUERY}>{
              ({data, loading, error}) => {


                if (loading) {
                  return <div>Loading...</div>;
                }

                if (error) {
                  return <div>Error: {error.message}</div>;
                }
                /*              return <div>
                  <div> Edit Car Id: {data.editCardId}</div>
                  <h1>{data.headerText}</h1>
                  <div>Edit CarId : {data.editCardId}</div>
                  <div>Number of Cars: {data.cars.length}</div>

                  {/!*                <ul>
                    {data.cars.map(car => <li key={car.id}>
                      {car.make} {car.model} {car.year}
                      <button type="button" onClick={() => editCar(car.id)}>Edit</button>
                    </li>)}
                  </ul>*!/}
                </div>;*/
                return <CarTable cars={data.cars} editCarId={data.editCardId} onEditCar={editCar} onUpdateCar={replaceCar}/>;

                //return <CarTable cars={data.cars} onDeleteCar={props.onDeleteCar} editCarId={data.editCardId} onEditCar={props.onEditCar} onUpdateCar={props.onUpdateCar} onCancelCar={props.onCancelCar}/>
                //return <CarTable cars={data.cars}/>;

              }
            }</Query>;
          }}</Mutation>;
        }}
      </Mutation>

      <Mutation mutation={APPEND_CAR_MUTATION}>{(mutate) => {  // use Mutation to update store data or use Query to fetch data.. server operation to add to the collection of cars to the server
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

              const data = store.readQuery({query: APP_QUERY});  //fetches the car from cache and optimistic response is used
              data.cars = data.cars.concat(car);  //concat the cars data
              store.writeQuery({query: APP_QUERY, data}); // writeQuery updates the store with cars to the cache
            },
          });
        };
        return <CarForm buttonText="Add Car" onSubmitCar={appendCar}/>;
      }}</Mutation>

    </>;
  }
}


/*
Exercise 2

1. Copy the CarTable component (and any extra components needed) to the Apollo application. You may put them in the components folder (create the folder if needed)

  2. Utilize the CarTable component in App.js to display the table of cars. Do not worry about the button on the row, don't delete them but just provide noop functions to them.

3. Ensure it works.

return <CarForm buttonText="Add Car" onSubmitCar={appendCar}/>;
*/

