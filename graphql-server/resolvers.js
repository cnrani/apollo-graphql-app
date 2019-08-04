import fetch from 'node-fetch';

export const resolvers = {
  Query: {
    message: () => 'Hello World!',  //need to send string and define in schema. The above functions cars, message  are invoked by appolo server
    //based on the query , resolver fetches the data and based on the schema.js , it displays the data
    cars: (_1, _2, {restURL}) => {

      return fetch(`${restURL}/cars`)
        .then(res=>res.json());

    },

    widgets: (_1, _2, {restURL}) => {

      return fetch(`${restURL}/widgets`)
        .then(res=>res.json());

    }
  },

  Mutation: {

    appendCar: (_, {car}, {restURL}) => {

      return fetch(`${restURL}/cars`,{
        method: 'POST',
        headers: { 'Content-type':'application/json'},
        body: JSON.stringify(car),
      })
        .then(res => res.json());
    },

    appendWidget: (_, {widget}, {restURL}) => {

      return fetch(`${restURL}/widgets`,{
        method: 'POST',
        headers: { 'Content-type':'application/json'},
        body: JSON.stringify(widget),
      })
        .then(res => res.json());
    },


    replaceCar: (_, {car}, {restURL}) => {

      return fetch(`${restURL}/cars/${car.id}`,{
        method: 'PUT',
        headers: { 'Content-type':'application/json' },
        body: JSON.stringify(car),
      })
        .then(res => res.json())
        .then(car => {
          console.log(car);
          return car;
        });
    }

  }
};
