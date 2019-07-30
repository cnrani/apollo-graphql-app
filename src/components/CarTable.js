import React from 'react';
import { ViewCarRow } from './ViewCarRow';

export const CarTable = (props) => {

  return <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Make</th>
        <th>Model</th>
        <th>Year</th>
        <th>Color</th>
        <th>Price</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        props.cars.map(car =>
          <ViewCarRow  key={car.id} car={car} />)}
    </tbody>
  </table>;

};