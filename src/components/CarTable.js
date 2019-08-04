import React from 'react';
import { ViewCarRow } from './ViewCarRow';
import { EditCarRow } from './EditCarRow';

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
          props.editCarId === car.id
            ? <EditCarRow car={car} onUpdateCar={props.onUpdateCar} onCancelCar={props.onCancelCar}/>
            : <ViewCarRow key={car.id} car={car} onDeleteCar={props.onDeleteCar} onEditCar={props.onEditCar}/>)}
    </tbody>
  </table>;

};