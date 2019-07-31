import React from 'react';
import {useForm} from '../hooks/useForm';

export const CarForm = (props) => {

  const [carForm, change, resetCarForm] = useForm({
    make: '',
    model: '',
    year: '',
    color: '',
    price: ''
  });

  const submitCar = () => {
    props.onSubmitCar({...carForm});
    resetCarForm();
  };


  return <div>
    <form>
      <div>
        <label htmlFor="make-input">Make:</label>
        <input type="text" id="make-input" name="make" value={carForm.make} onChange={change}></input>
      </div>
      <div>
        <label htmlFor="model-input">Model:</label>
        <input type="text" id="model-input" name="model" value={carForm.model} onChange={change}></input>
      </div>
      <div>
        <label htmlFor="year-input">Year:</label>
        <input type="number" id="year-input" name="year" value={carForm.year} onChange={change}></input>
      </div>
      <div>
        <label htmlFor="color-input">Color:</label>
        <input type="text" id="color-input" name="color" value={carForm.color} onChange={change}></input>
      </div>
      <div>
        <label htmlFor="price-input">Price:</label>
        <input type="number" id="price-input" name="price" value={carForm.price} onChange={change}></input>
      </div>
      <div>
        <button type="button" onClick={submitCar}>{props.buttonText}</button>
      </div>
    </form>
  </div>;

};