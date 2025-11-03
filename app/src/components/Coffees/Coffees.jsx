import Coffee from '../Coffee/Coffee';
import { useState, useEffect } from 'react';
import './Coffees.css';

function Coffees() {
  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    fetch('http://localhost/coffees', { credentials: 'include' })
      .then((res) => res.json())
      .then((coffees) => setCoffees((prev) => coffees))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className='coffees'>
      {coffees.map((el) => (
        <Coffee key={el.id} {...el} />
      ))}
    </div>
  );
}
export default Coffees;
