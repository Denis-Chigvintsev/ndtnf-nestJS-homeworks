import React from 'react';
import Menu from '../Menu/Menu';

import { useState, useEffect } from 'react';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

function Home() {
  useEffect(() => {
    window.location.href = 'http://localhost/authentication/yandex';

    /*fetch('http://localhost/authentication/yandex')
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((error) => {
        return error;
      });
      */
  }, []);

  return (
    <div>
      <Menu />
    </div>
  );
}

export default Home;
