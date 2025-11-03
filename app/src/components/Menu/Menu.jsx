import React from 'react';
import { Link } from 'react-router-dom';
import s from './Menu.module.css';
import { useState, useEffect } from 'react';

function Menu() {
  return (
    <div className={s.menu}>
      <Link to='/'>
        <h1>Аутентификация через Яндекс</h1>
      </Link>
      <Link to='/pullAll'>
        <h1>Вывести из базы все виды Кофе</h1>
      </Link>
    </div>
  );
}

export default Menu;
