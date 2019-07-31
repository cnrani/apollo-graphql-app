import {useState} from 'react';


export const useForm = (initialForm) => {   //custom hook

  const [form, setForm] = useState(initialForm);   // returns array

  const change = ({target: {name, value, type}}) => {
    setForm({
      ...form,
      [name]: type=== 'number' ? Number(value): value,   //convert into number if type=number
    });
  };

  return [form, change, () => setForm(initialForm)]; // return array object

};