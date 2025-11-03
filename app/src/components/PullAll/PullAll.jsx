import React from 'react';

import { useState, useEffect } from 'react';


import s from './PullAll.module.css';

import Menu from '../Menu/Menu';
import Coffees from '../Coffees/Coffees';

function PullAll() {
 

  return (
    <div>
      <Menu />
      <Coffees />
    </div>
  );
}

export default PullAll;
