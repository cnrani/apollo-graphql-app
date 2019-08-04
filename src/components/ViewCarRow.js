import React from 'react';

export const ViewCarRow = ({car, onDeleteCar, onEditCar}) => {

  const deleteCar = () => {
    onDeleteCar(car);
  };

  const editCar = () => {
    onEditCar(car.id);
  };

  return <tr key={car.id}>
    <td>{car.id}</td>
    <td>{car.make}</td>
    <td>{car.model}</td>
    <td>{car.year}</td>
    <td>{car.color}</td>
    <td>{car.price}</td>
    <td>
      <button type="button" onClick={deleteCar}>Delete</button>
      <button type="button" onClick={editCar}>Edit</button>
    </td>
  </tr>;

};