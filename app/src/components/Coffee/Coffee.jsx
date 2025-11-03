import './Coffee.css';

function Coffee(coffee) {
  return (
    <div className='coffee'>
      <p>{coffee.name}</p>
      <p>{coffee.brand}</p>
    </div>
  );
}

export default Coffee;
